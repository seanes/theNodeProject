import express from 'express';
import mongoose from 'mongoose';

import Profile from '../model/Profile';

const router = express.Router();

router.route('/')
    .get((req, res, next) => {

        const user = process.env.NODE_ENV === 'test' ? 'jorgen.braekke@soprasteria.com' : req.user.email 

        Profile.findOne({email : user}, (err, profile) => {
            if(err)
                next(err)
            else{
                console.log(profile)
                res.status(200).json(profile);
            }
        })
    });

export default router;