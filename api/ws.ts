import * as WebSocket from 'ws';
import * as express from 'express';
import { Application } from 'express-ws';

import { ArrivalFlightUpdate, updatedArrivals } from './arrivals';
import { DepartureFlightUpdate, updatedDepartures } from './departures';

export type FlightUpdate = ArrivalFlightUpdate | DepartureFlightUpdate;
export enum MessageType {
    PRINT = 'PRINT',
    FLIGHT_UPDATE = 'FLIGHT_UPDATE',
}
export interface WSMessageType<Type extends MessageType, Payload> {
    type: Type;
    payload: Payload;
}

export type WSPrintMessage = WSMessageType<MessageType.PRINT, 'ArrivalTimeMap'>;
export type WSFlightUpdateMessage = WSMessageType<MessageType.FLIGHT_UPDATE, FlightUpdate>;

export type WSMessage = WSPrintMessage | WSFlightUpdateMessage;

const flightUpdates: FlightUpdate[] = [...updatedArrivals, ...updatedDepartures];

export const websocketify = (app: Application) => {
    app.ws('/flightUpdates', (ws: WebSocket, req: express.Request) => {
        console.log('Websocket client connected');

        const quarterOfFlightUpdateLength = Math.floor(flightUpdates.length / 4);
        const printRequestOffsets = [
            quarterOfFlightUpdateLength,
            quarterOfFlightUpdateLength * 2,
            quarterOfFlightUpdateLength * 3,
            flightUpdates.length - 1,
        ];
        const flightUpdateEntries = Array.from(flightUpdates.entries());

        console.log('Sending flight updates...');
        for (const [index, update] of flightUpdateEntries) {
            if (printRequestOffsets.includes(index)) {
                console.log('Sending print message...');
                ws.send(JSON.stringify({ type: MessageType.PRINT, payload: 'ArrivalTimeMap' } as WSPrintMessage));
            }

            ws.send(JSON.stringify({ type: MessageType.FLIGHT_UPDATE, payload: update } as WSFlightUpdateMessage));
        }

        console.log('Done');
        ws.close();

        ws.onclose = () => {
            console.log('Websocket client disconnected');
        };
    });
};
