import { InMemoryDictionaryStore } from '../challenge-2/in-memory-dictionary-store';
import { createProjection, FlightByBlockTimeState, FlightUpdateMessageTypes } from './challenge-2';
import { arrivals, cancellations, departures } from '../challenge-2/challenge-2.messages';

const flightByBlockTimeStore = new InMemoryDictionaryStore<FlightByBlockTimeState>({
    lateArrivals: [],
    earlyArrivals: [],
    lateDepartures: [],
    earlyDepartures: [],
});

const projection = createProjection(flightByBlockTimeStore);

/**
 * Simulate flight updates
 */
const simulate = async () => {
    for (const payload of departures) {
        await projection.handle({
            messageType: FlightUpdateMessageTypes.FLIGHT_UPDATED,
            payload,
        });
    }
    for (const payload of arrivals) {
        await projection.handle({
            messageType: FlightUpdateMessageTypes.FLIGHT_UPDATED,
            payload,
        });
    }
    for (const payload of cancellations) {
        await projection.handle({
            messageType: FlightUpdateMessageTypes.FLIGHT_CANCELED,
            payload,
        });
    }
};

simulate().then(async () => {
    const state = await flightByBlockTimeStore.get();

    console.log('flight state summary:');
    Object.entries(state).forEach(([key, flights]) => {
        console.log(`${key}: ${flights.length} flights`);
    });
});
