import express from 'express';
import mongoose from 'mongoose';
import User from '../model/User';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.status(200).json({
            message : "no content"
        })
    });


//validate hash
router.route('/:id')
    .get((req, res, next) => {
        User.findOne({
            'activationHash' : req.params.id,
            'active' : false
        }, (err, user) =>{
            if (err){
                res.status(400).json({
                    message : "We fucked up, try again later",
                    success : false
                })
            }
            else{
                if(user === null)
                    res.status(200).json({message : "not valid", success : false});
                else{
                    user.active = true;
                    user.save((err) => {
                        if(err)
                            res.status(400).json({message : "We fucked up, try again later", success : false})
                        else{
                            req.logIn(user, (err) => {
                                if(err)
                                    next(err)
                                else{
                                    res.redirect('/api/events');
                                }
                            })
                            //res.status(200).json({message : "The account is validated, please log in with your mail " + user.email, success : true})
                        }
                    })
                }
            }
        });
    });

export default router;