import express from 'express';
import mongoose from 'mongoose';
import Profile from '../model/Profile';
const router = express.Router();
import bodyParser from 'body-parser';

router.route('/')
    .post((req, res) => {

        const user = process.env.NODE_ENV === 'test' ? 'jorgen.braekke@soprasteria.com' : req.user.email 

        Profile.findOne({email: user}, (err, profile) => {
            if(err)
                next(err);

            profile.description = req.body.description ? req.body.description : '';
            profile.profile_img = req.body.img ? req.body.img : '';

            profile.save((err, doc) =>{
                if(err)
                    next(err)
                else
                    res.status(200).json(doc); 
            });
        })
    });
export default router;