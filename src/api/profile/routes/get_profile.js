import express from 'express';
import Profile from '../model/Profile';

const router = express.Router();

router.route('/')
    .get((req, res, next) => {

        const user = process.env.NODE_ENV === 'test' ? 'jorgen.braekke@soprasteria.com' : req.user.email
        const userId = process.env.NODE_ENV === 'test' ? '' : req.user._id

        Profile.findOne({email : user}, (err, profile) => {
            if(err)
                next(err)
            else {
                res.status(200).json({ ...profile._doc, "userId": userId });
            }
        })
    });

export default router;