import express from 'express';
import mongoose from 'mongoose';
import Event from '../model/Event';
const router = express.Router();
import bodyParser from 'body-parser';

router.route('/')
    .post((req, res) => {


        const makeID = ()=>{
            let id = "";
            const numb = "0123456789";
            const abc = "abcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < 4; i++ )
                id += numb.charAt(Math.floor(Math.random() * numb.length));

            return id + abc.charAt(Math.floor(Math.random()* abc.length));
        } 

        let event = new Event({
            
            ref : makeID(),
            event_name : req.body.event_name,
            description: req.body.description,
            image : req.body.image,
            capacity : req.body.capacity,
            event_date : req.body.event_date,
            participation_deadline: req.body.participation_deadline,
            event_status: req.body.event_status,
            event_type: req.body.event_type,
            event_location: req.body.event_location,
            participants: [],
            hosts:  req.body.hosts
        })


        event.save((err) => {
            if(err){
                console.log("Oh shit, something bad happend");
                res.status(400).json(err);
            }
            else
                res.status(200).json(event);
        });


    });

export default router;