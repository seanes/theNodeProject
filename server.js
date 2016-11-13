'use strict';

//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config/config");

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/api/events', require('./api/event/routes/get_events'));
app.use('/api/event', require('./api/event/routes/get_event'));
app.use('/api/event', require('./api/event/routes/post_event'));

//kickstart server
app.listen(port, () =>{

    mongoose.connect(config.db, config.dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
         console.log("Magic is happening on port: ", port);
    });
})