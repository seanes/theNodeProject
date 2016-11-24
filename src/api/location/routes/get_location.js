import express from 'express';
import Location from '../model/Location';
const router = express.Router();

router.route('/')
    .get( (req, res) => {
        Location.find({}, (err, docs, next) => {
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
        Location.findById(id, (err, doc) => {
            if(err || !doc) {
                res.status(404).send("Not found");
            } else {
                res.send(doc);
            }
        });
    });

export default router;