/**
 * Challenge 2
 *
 * The goal of this challenge is to collect arrival and departure flight records and placing them into 4 buckets:
 *
 * - Early Arrivals
 * - Late Arrivals
 * - Early Departures
 * - Late Departures
 *
 * Process the payload of the FLIGHT_UPDATE and FLIGHT_CANCELED messages which, in production, would be fetched from kafka.
 * The flight object from the FLIGHT_UPDATE message should be put in the correct bucket, on a FLIGHT_CANCELED message the flight should be removed from the bucket.
 * After each message the updated state needs be stored into the database. Note that you can get multiple FLIGHT_UPDATE messages for the same flight in case of updates to the flight planning.
 *
 * We've implemented an in-memory database but in production this can be a different database like Redis which means the stored data must be JSON-serializable.
 * You are allowed to use any node_module to assist you with writing the code/logic.
 *
 * The bucket a flight belongs to can be determined by the delta between the plannedDepartureTime vs takeOffTime and plannedArrivalTime vs landingTime.
 * For example; a flight with a takeOffTime that is before the departureTime is counted as an early departure.
 *
 * The data in the store could look something like this but you are free use a different data structure if that is desired
 * {
 *     lateArrivals: [
 *         { /* flight 1234AB / },
 *         { /* flight 4645DF / },
 *     ],
 *     earlyArrivals: [],
 *     lateDepartures: [
 *         { /* flight 9001BI / },
 *     ],
 *     earlyDepartures: [],
 * }
 *
 * To validate your solution please amend the unit tests in challenge-2.spec.ts to cover edge cases handled by your implementation.
 * You can run a simulation of a set of sample messages by calling `npm run challenge-2` which runs the challenge-2.simulation.ts file
 */

import { DictionaryProjection } from '../challenge-2/projection';
import { Message, StreamDefinition } from '../challenge-2/stream';
import { ArrivalFlight, DepartureFlight, FlightCanceledMessage } from '../challenge-2/flight';
import { Dictionary, DictionaryStore } from '../challenge-2/dictionary-store';

export enum FlightUpdateMessageTypes {
    FLIGHT_UPDATED = 'FLIGHT_UPDATED',
    FLIGHT_CANCELED = 'FLIGHT_CANCELED',
}

export interface FlightUpdateStream extends StreamDefinition<FlightUpdateMessageTypes> {
    messages: {
        [FlightUpdateMessageTypes.FLIGHT_UPDATED]: Message<
            FlightUpdateMessageTypes.FLIGHT_UPDATED,
            ArrivalFlight | DepartureFlight
        >;
        [FlightUpdateMessageTypes.FLIGHT_CANCELED]: Message<
            FlightUpdateMessageTypes.FLIGHT_CANCELED,
            FlightCanceledMessage
        >;
    };
}

export interface FlightByBlockTimeState extends Dictionary<ArrivalFlight[] | DepartureFlight[]> {
    lateArrivals: ArrivalFlight[];
    earlyArrivals: ArrivalFlight[];
    lateDepartures: DepartureFlight[];
    earlyDepartures: DepartureFlight[];
}

/**
 * This function creates the logic for a projection. A projection translates one or more event types into a (aggregated) state.
 * The caller of this function provides a datastore (e.g. Redis) and must make sure the `AbstractMessageHandler.handle` function is called on new events (e.g. from Kafka).
 * You will need to implement the logic translating events into the aggregated state
 */
export function createProjection(flightByBlockTimeStore: DictionaryStore<FlightByBlockTimeState>) {
    const projection = new DictionaryProjection<FlightUpdateStream, FlightByBlockTimeState>(flightByBlockTimeStore);

    projection.when({
        [FlightUpdateMessageTypes.FLIGHT_UPDATED]: async (store, { payload: flight }) => {
            /**
             * Put the flight from the event in the correct bucket of the store
             */
        },
        [FlightUpdateMessageTypes.FLIGHT_CANCELED]: async (store, { payload: event }) => {
            /**
             * Remove the flight from the event from its bucket in the store
             */
        },
    });

    return projection;
}
