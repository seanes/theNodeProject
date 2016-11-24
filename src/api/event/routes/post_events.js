import express from 'express';
import Event from '../model/Event';
import Counter from '../model/Counter'

const router = express.Router();

router.route('/')
    .post((req, res) => {
        //find and update incremental user_code
        Counter.findByIdAndUpdate({_id: 'eventCounter'},  {$inc: { seq: 1} } , (err, inc, next) => {
            if(err)
                next(err)

            let event = new Event({
                user_code : inc.seq,
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
            });

            //save event
            event.save((err) => {
                if(err){
                    console.log("Oh shit, something bad happend");
                    res.status(500).json(err);
                }
                else
                    res.status(200).json(event);
            });
        })
    });

export default router;