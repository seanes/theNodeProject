import express from 'express';
import mongoose from 'mongoose';
import User from '../../user/User';
const router = express.Router();
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import passportConfig from "../../../../config/passport"



router.route('/')
    .post((req, res) => {

        //create looong hash for one-time-use
        const makeHash = () => {
            let id = "";
            const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for( var i=0; i < 50; i++ )
                id += abc.charAt(Math.floor(Math.random() * abc.length));

            return id;
        }

        //user obj to db
        let user = new User({
            name : req.body.name,
            email : req.body.email.toLowerCase(),
            role: "member",
            activationHash : makeHash(),
            pw : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
        })

        user.save((err) => {
            if(err){
                if(err.code !== 11000)
                    res.status(400).json(err);
                else{
                    res.status(409).json({
                        message : req.body.email + " is already registered"
                    })
                }
            }
            else
                res.status(200).json(
                    {
                        email : user.email,
                        message : "user created, check your email to validate your account"
                    }
                );
        });


    });

router.route('/login')
    .post((req, res) => {
        User.findOne({
            email: req.body.email,
            active: true
        }, (err, user) => {
            if(err)
                res.status(400).json({
                    message : "Darn, something happend. Try later",
                    data : {},
                    success : false
                })
            else{
                passport.authenticate('local-login', (err,user, info) => {
                     if (err) 
                        res.status(400).json({message : "we fucked up, sorry"});
                     if (user){
                        res.logIn(user, (err) => {
                            if(err)
                                res.status(400).json({message : "we fucked up, sorry"});
                            else
                                res.status(200).json({message : "logged in!"})
                        })
                     }
                     else
                        res.status(200).json({message : "no user by this account"})
                });
            }
        })
    });

export default router;