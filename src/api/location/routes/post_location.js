import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import bodyParser from 'body-parser';

import Location from '../model/Location';

router.route('/')
    .post((req, res) => {
        let location = new Location({
            name : req.body.name,
            address : req.body.address,
            description: req.body.description,
            etg : req.body.etg,
            coordinates : req.body.coordinates,
        });
        location.save((err) => {
            if(err){
                res.status(500).json(err);
            }
            else
                res.status(200).json(location);
        });
    });

export default router;
