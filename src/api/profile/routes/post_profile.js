import express from 'express';
import mongoose from 'mongoose';
import Profile from '../model/Profile';
const router = express.Router();
import bodyParser from 'body-parser';

router.route('/')
    .post((req, res) => {
        
            const profile = new Profile({
                
            })        
            
            user.profile.push({
                profile_img : req.body.img,
                description : req.body.description
            });
        
            user.name = req.body.name;

    });
export default router;