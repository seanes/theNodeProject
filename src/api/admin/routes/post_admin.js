import express from 'express';
import Event from '../../event/model/Event';
import User from '../../user/model/User';
const router = express.Router();

router.route('/events/:id')
    .post( (req, res, next) => {
        const { id } = req.params;
        Event.findOne({user_code : id}, (err, event) => {
            if(err) {
                next(err);
            } else {
                event = {
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
                    hosts:  req.body.hosts,
                    hidden: req.body.hidden
                }

                //save event
                event.save((err, user) => {
                    if(err){
                        console.log("Oh shit, something bad happend");
                        res.status(500).json(err);
                    }
                    else
                        res.status(200).json(user);
                });
            }
        });
    });

router.route('/user')
    .post((req, res, next) => {;
        User.findOne({email: req.body.email}, (err, user) => {
            if(err || !user) {
                res.status(404).send("Not found");
            } else {
                
                user.active =  req.body.active
                
                //save user
                user.save((err, user) => {
                    if(err)
                        next(err)
                    else
                        res.status(200).json(user);
                });
            }
        });
    });

router.route('/user/grant-admin-access')
    .post((req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err || !user) {
                res.status(404).send("Not found");
            } 
            else { 
                //role: member || admin
                user.role =  req.body.role
                
                //save user
                user.save((err, user) => {
                    if(err){
                        next(err)
                    }
                    else
                        res.status(200).json(user);
                });
            }
        });
    });

export default router;