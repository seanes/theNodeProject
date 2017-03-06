import express from 'express';
import Profile from '../../profile/model/Profile';

const router = express.Router();

router.route('/')
.get((req, res) => {

  const searchQuery = req.query.search
  const query = new RegExp(searchQuery, "ig")

  Profile.find({name: { $regex:  query } }, (err, profile) => {
    if(err)
      res.status(500).json({'error': err});
    else {
      res.status(200).json({results: profile})
    }
  })
});

export default router;