import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import bodyParser from 'body-parser';

import Location from '../model/Location';

router.route('/')
    .post((req, res) => {
        //save location
        let location = new Location({
            name : req.body.name,
            address : req.body.address,
            description: req.body.description,
            etg : req.body.etg,
            lat : req.body.lat,
            lng : req.body.lng
        });

        //save event
        location.save((err) => {
            if(err){
                res.status(400).json(err);
            }
            else
                res.status(200).json(location);
        });
    });

export default router;