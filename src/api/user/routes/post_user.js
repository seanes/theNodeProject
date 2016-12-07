//vendors
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import nodemailer from 'nodemailer';
import async from 'async';
import path from 'path';

//config
const router = express.Router();
import passportConfig from "../../../../config/passport"

//models
import User from '../model/User';
import Profile from '../../profile/model/Profile';
import Partner from '../../profile/model/Partner'

const test = process.env.NODE_ENV === 'test';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://soprasteria.stand%40gmail.com:Drossap312@smtp.gmail.com');

//create looong hash for one-time-use
const makeHash = () => {
    let id = "";
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

    for( var i=0; i < 50; i++ )
        id += abc.charAt(Math.floor(Math.random() * abc.length));

    return id;
}


router.route('/')
    .post((req, res, next) => {

    async.waterfall([
        //create user
        (done) => {
            //email to lowercase
            let mail = req.body.email ? req.body.email.toLowerCase() : '';
            
            //create a user object
            let user = new User({
                email : mail,
                role: "member",
                activationHash : makeHash(),
                pw : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
            });

            user.save((err) => {
                if(err){
                    if(err.code !== 11000){
                        res.status(423).json({
                            message : req.body.email + " you need to be in the right domain"
                        })
                    }
                    else{
                        res.status(409).json({
                            message : req.body.email + " is already registered"
                        })
                    }
                     done(err, user);
                }
                else{
                    done(err, user);
                }
            });
            
        },
        //send vertification mail to user
        (user, done) => {
            const fullUrl = req.protocol + '://' + req.get('host');

            if(test){
                res.status(200).json({
                    email : user.email,
                    message : "user created, check your email to validate your account"
                });
                done(user)
            }
            else{
                const mailOptions = {
                    from: '"Sopra Steria Events" <events@soprasteria.com>', // sender address
                    to: user.email, // list of receivers
                    subject: 'Vertify your account', // Subject line
                    text: "Hi, please vertify your account on this url: " + fullUrl + '/api/validateUser/' + user.activationHash, // plaintext body
                    //html: htmlContent // html body
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if(err){
                        res.status(400).json({message : "we fucked up, sorry"});
                    }
                    else{
                        res.status(200).json({
                            email : user.email,
                            message : "user created, check your email to validate your account"
                        });
                    }
                    done(err, user);
                });
            }
        },
        //update profile with cv data
        (user, done) => {
            Partner.findOne({email : user.email}, (err, partner) => {
                if(err)
                    done(err)
                if(partner){
                    const profile = new Profile({
                        name : partner.name,
                        description : partner.depatment,
                        email : user.email
                    });

                    profile.save().then((profile) =>{
                        done(err)
                    });
                }
                else{
                    const profile = new Profile({
                        email : user.email,
                        event_history : [],
                        profile_img : "",
                        description : ""
                    })

                    profile.save().then((profile) =>{
                        done(err)
                    });
                }
            });
        },
        (err) => {
            console.log("err is here")
            next(err);
        }
    ])

       

       /* 

        user.save((err) => {
            if(err){
                if(err.code !== 11000)
                    next(err)
                else{
                    res.status(409).json({
                        message : req.body.email + " is already registered"
                    })
                }
            }
            else{

                const fullUrl = req.protocol + '://' + req.get('host');

                if(test){
                    res.status(200).json({
                        email : user.email,
                        message : "user created, check your email to validate your account"
                    });
                }
                else{
                
                    const mailOptions = {
                        from: '"Sopra Steria Events" <events@soprasteria.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Vertify your account', // Subject line
                        text: "Hi, please vertify your account on this url: " + fullUrl + '/api/validateUser/' + user.activationHash, // plaintext body
                        //html: htmlContent // html body
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            res.status(400).json({message : "we fucked up, sorry"});
                        }
                        else{
                            res.status(200).json({
                                email : user.email,
                                message : "user created, check your email to validate your account"
                            });
                        }
                    });
                }


                //update profile with cv data
                Partner.findOne({email : user.email}, (err, partner) => {
                    if(err)
                        next(err)
                    if(partner){
                        const profile = new Profile({
                            name : partner.name,
                            description : partner.depatment,
                            email : user.email
                        });

                        profile.save().then((profile) =>{
                        });
                    }
                    else{
                        const profile = new Profile({
                            email : user.email,
                            event_history : [],
                            profile_img : "",
                            description : ""
                        })

                        profile.save().then((profile) =>{
                            console.log("profile saved")
                        });
                    }
                });


            }
        });*/
    });

router.route('/login')        
    .post(passport.authenticate('local-login', {
        successRedirect: '/api/events', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

//send reset hash to a mail
//todo: what to do with not activated accounts
router.route('/forgot')
    .post((req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err)
                next(err);
            if(!user)
                res.status(200).json({message : "no user by this email"})
            else{
                user.resetPwToken = makeHash()
                user.resetPwExpires = Date.now() + 3600000; // 1 hour

                const promise = user.save();

                promise.then((user) => {
                    const fullUrl = req.protocol + '://' + req.get('host');
                    
                    const mailOptions = {
                        from: '"Sopra Steria Events" <events@soprasteria.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Reset your account', // Subject line
                        text: "Hi, please reset your account on this url: " + fullUrl + '/api/user/forgot/' + user.resetPwToken + ' within an hour.', // plaintext body
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            next(err)
                        }
                        else{
                            res.status(200).json({
                                email : user.email,
                                message : "check your mail"
                            });
                        }
                    });
                })

            }
        });
    });

router.route('/forgot/:id')
    .get((req, res, next) => {
        const id = req.params.id;
        User.findOne({resetPwToken : id, resetPwExpires: { $gt : Date.now() } }, (err, user) => {
            if(err)
                res.status(200).json(err)
            if(!user)
                res.status(200).json({message : "Token is invalid or has expired"})
            else{
                req.logIn(user, (err) => {
                    if(err)
                        next(err)
                    else{
                        res.sendFile(path.dirname(process.mainModule.filename) + '/public/reset.html');
                    }
                });
            }
        })
    });


router.route('/reset')
    .post((req, res, next) => {
        const user = req.user;

        user.pw = bcrypt.hashSync(req.body.pw, bcrypt.genSaltSync(8), null)
        user.resetPwToken = "";

        user.save().then((user) => {
            const fullUrl = req.protocol + '://' + req.get('host');
                    
            const mailOptions = {
                from: '"Sopra Steria Events" <events@soprasteria.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Password is changed', // Subject line
                text: "Your password has been changed on: " + fullUrl  , // plaintext body -
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    next(err)
                }
                else{
                    res.redirect(fullUrl + '/api/events')
                }
            });
        })
    });

export default router;