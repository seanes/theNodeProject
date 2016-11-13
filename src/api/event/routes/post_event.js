'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Event = require('../model/Event.js');
const router = express.Router();
const bodyParser = require("body-parser");

router.route('/')
    .post((req, res) => {
        
        let event = new Event({
            
            event_id: "65131",
            event_name : req.body.event_name,
            description: "Et kurs for alle som er interessert i Node utvikling",
            image : "data:image/jpeg;base64,/9j/4QUmRXhpZgAASUkqABAAAAAAAAAAAAAAAAIADgE",
            capacity : 32,
            event_date : "Mon Nov 14 2016 17:00:00 GMT+0100",
            participation_deadline: "Sun Nov 13 2016 14:13:47 GMT+0100",
            event_status: "active",
            event_type: "workshop",
            event_location: "MELKEVEIEN, BG14",
            participants: [],
            hosts:  ["Jørgen Brække", "Sean Scully"]
        })

        event.save((err) => {
            if(err)
                console.log("Oh shit, something happend");
                
            res.status(200).json(event);
        });


    });

module.exports = router;