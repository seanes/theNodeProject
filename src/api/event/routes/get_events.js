import express from 'express';
import mongoose from 'mongoose';
import Event from '../model/Event';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        Event.find({}, (err, events) => {
            if(err)
                res.status(400).json(err);

            res.status(200).json(events)
        });
    });

router.route('/:id')
    .get((req, res) => {
        const requestId = req.params.id;
        res.send(requestId);
    });

export default router;