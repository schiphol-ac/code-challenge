import { InMemoryDictionaryStore } from '../challenge-2/in-memory-dictionary-store';
import { createProjection, FlightByBlockTimeState, FlightUpdateMessageTypes, FlightUpdateStream } from './challenge-2';
import { DictionaryProjection } from '../challenge-2/projection';
import { ArrivalFlight, FlightCanceledMessage, FlightDirection } from '../challenge-2/flight';

describe('challenge 2', () => {
    let flightByBlockTimeStore: InMemoryDictionaryStore<FlightByBlockTimeState>;
    let projection: DictionaryProjection<FlightUpdateStream, FlightByBlockTimeState>;

    beforeEach(() => {
        flightByBlockTimeStore = new InMemoryDictionaryStore<FlightByBlockTimeState>({
            lateArrivals: [],
            earlyArrivals: [],
            lateDepartures: [],
            earlyDepartures: [],
        });
        projection = createProjection(flightByBlockTimeStore);
    });

    it('should insert flight in the correct bucket', async () => {
        // Arrange
        const flight: ArrivalFlight = {
            flightNumber: 'KL937',
            direction: FlightDirection.Arrival,
            origin: 'Paris de Gaulle',
            gate: 'A25',
            passengers: 131,
            plannedArrivalTime: '2019-06-15T13:50:00.000Z',
            landingTime: '2019-06-15T14:03:00.000Z',
        };

        // Act
        await projection.handle({
            messageType: FlightUpdateMessageTypes.FLIGHT_UPDATED,
            payload: flight,
        });

        // Assert
        const state = await flightByBlockTimeStore.get();
        expect(state).toEqual(
            expect.objectContaining({
                lateArrivals: [flight],
            }),
        );
    });

    it('should remove the flight when it is cancelled', async () => {
        // Arrange
        const flight: ArrivalFlight = {
            flightNumber: 'KL937',
            direction: FlightDirection.Arrival,
            origin: 'Paris de Gaulle',
            gate: 'A25',
            passengers: 131,
            plannedArrivalTime: '2019-06-15T13:50:00.000Z',
            landingTime: '2019-06-15T14:03:00.000Z',
        };
        await flightByBlockTimeStore.setItem('lateArrivals', [flight]);

        const flightCancellation: FlightCanceledMessage = {
            flightNumber: flight.flightNumber,
            direction: flight.direction,
        };

        // Act
        await projection.handle({
            messageType: FlightUpdateMessageTypes.FLIGHT_CANCELED,
            payload: flightCancellation,
        });

        // Assert
        const state = await flightByBlockTimeStore.get();
        expect(state).toEqual(
            expect.objectContaining({
                lateArrivals: [],
            }),
        );
    });
});
