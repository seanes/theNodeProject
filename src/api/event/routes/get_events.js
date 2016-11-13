'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Event = require('../model/Event');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        Event.find({}, (err, events) => {
            if(err)
                res.status(400).json(err);
            
            res.status(200).json(events)
        });
    });

module.exports = router;