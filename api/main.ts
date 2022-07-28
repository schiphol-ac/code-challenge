import express from 'express';
import expressWsMiddleware from 'express-ws';
import cors from 'cors';
import { arrivals } from './arrivals';
import { departures } from './departures';
import { gateChanges } from './gate-changes';
import { websocketify } from './ws';

const app = expressWsMiddleware(express()).app;

app.use(cors());

app.get('/arrivals', (req, res) => {
    res.json(arrivals);
});

app.get('/departures', (req, res) => {
    res.json(departures);
});

app.get('/gate-changes/:search', (req, res) => {
    const search = req.params.search;

    const filteredGateChanges = gateChanges.filter(gc => {
        return gc.flightNumber.includes(search);
    });

    // Mimic network latency
    setTimeout(() => {
        res.json(filteredGateChanges);
    }, Math.random() * 5000);
});

websocketify(app);

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});
