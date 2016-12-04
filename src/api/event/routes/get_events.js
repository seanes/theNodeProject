import express from 'express';
import Event from '../model/Event';
const router = express.Router();

router.route('/')
    .get( (req, res) => {
        Event.find({hidden: false}, (err, docs, next) => {
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
        Event.findById(id, (err, doc) => {
            if(err || !doc) {
                res.status(404).send("Not found");
            } else {
                res.send(doc);
            }
        });
    });

export default router;