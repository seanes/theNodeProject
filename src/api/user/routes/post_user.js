import express from 'express';
import mongoose from 'mongoose';
import User from '../model/User';
const router = express.Router();
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';
import passportConfig from "../../../../config/passport"
import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://soprasteria.stand%40gmail.com:Drossap312@smtp.gmail.com');

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


        let mail = req.body.email ? req.body.email.toLowerCase() : '';

        //user obj to db
        let user = new User({
            name : req.body.name,
            email : mail,
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
            else{

                let fullUrl = req.protocol + '://' + req.get('host');

                let mailOptions = {
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