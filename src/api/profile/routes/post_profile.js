import express from 'express';
import Profile from '../model/Profile';
const router = express.Router();

router.route('/')
.post((req, res) => {

  const user = process.env.NODE_ENV === 'test' ? 'jorgen.braekke@soprasteria.com' : req.user.email

  Profile.findOne({email: user}, (err, profile) => {
    if (err)
      next(err);

    profile.description = req.body.description ? req.body.description : profile.description;
    profile.profile_img = req.body.profile_img ? req.body.profile_img : profile.profile_img;
    profile.name = req.body.name ? req.body.name : profile.name;
    profile.modified = new Date();

    profile.save((err, doc) => {
      if (err)
        next(err)
      else
        res.status(200).json(doc);
    });
  })
});
export default router;