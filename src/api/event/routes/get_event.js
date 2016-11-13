'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Event = require('../model/Event.js');
const router = express.Router();

router.route('/:id')
    .get((req, res) => {
        const requestId = req.params.id;
        res.send(requestId);
    });

module.exports = router;