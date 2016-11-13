//imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "./config/config";

import getEventsRouter from './src/api/event/routes/get_events';
import postEventsrouter from './src/api/event/routes/post_events';

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use('/api/events', getEventsRouter);
app.use('/api/events', postEventsrouter);

//kickstart server
app.listen(port, () =>{

    mongoose.connect(config.db, config.dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(`Magic is happening on http://localhost:${port}`);
    });
})

export default app;