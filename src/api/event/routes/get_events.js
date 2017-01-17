import express from 'express';
import Event from '../model/Event';
const router = express.Router();

router.route('/')
    .get( (req, res) => {
        Event.find({hidden: false})
        .populate('event_location')
        .populate('hosts')
        .exec((err, docs) => {
            if(err) {
                next(err);
            } else {
                res.send(docs);
            }
        });
    });

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Event.findById(id)
        .populate('event_location')
        .populate('hosts').exec((err, doc) => {
            if(err || !doc) {
                res.status(404).send("Not found");
            } else {
                res.send(doc);
            }
        });
    });

export default router;