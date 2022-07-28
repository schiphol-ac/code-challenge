export enum FlightDirection {
    Arrival = 'A',
    Departure = 'D'
}

export interface CommonFlightProps {
    flightNumber: string;
    direction: FlightDirection;
    passengers: number;
    gate: string;
}

export interface ArrivalFlight extends CommonFlightProps {
    direction: FlightDirection.Arrival;
    origin: string;
    plannedArrivalTime: string;
    landingTime?: string;
}

export interface DepartureFlight extends CommonFlightProps {
    direction: FlightDirection.Departure;
    destination: string;
    plannedDepartureTime: string;
    takeOffTime?: string;
}

export interface FlightCanceledMessage {
    flightNumber: string;
    direction: FlightDirection;
}
