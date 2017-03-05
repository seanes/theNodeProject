import express from 'express';
import Event from '../model/Event';
import Counter from '../model/Counter'

const router = express.Router();

router.route('/:id/participate')
.post((req, res) => {

  const { id } = req.params;
  let user_id = req.user._id;

  Event.findByIdAndUpdate(id, { $addToSet: { participants: user_id }}, { new: false }, (err, doc) => {

    if (err) {
      res.status(500)
    } else if (doc) {
      res.status(200).json(doc)
    } else {
      res.status(404)
    }

  })
});

router.route('/:id/decline')
.post((req, res) => {
  const { id } = req.params;
  let user_id = req.user._id;

  Event.findByIdAndUpdate(id, { $pull: { participants: user_id }}, { new: false }, (err, doc) => {

    if (err) {
      res.status(500)
    } else {
      res.status(200).json(doc)
    }

  })
});


router.route('/')
.post((req, res) => {
  //find and update incremental user_code
  Counter.findByIdAndUpdate({_id: 'eventCounter'},  {$inc: { seq: 1} } , (err, inc, next) => {
    if(err)
      next(err)

    let event = new Event({
      user_code : inc.seq,
      event_name : req.body.event_name,
      description: req.body.description,
      image : req.body.image,
      capacity : req.body.capacity,
      event_date : req.body.event_date,
      participation_deadline: req.body.participation_deadline,
      event_status: req.body.event_status || 'active',
      event_type: req.body.event_type,
      event_location: req.body.event_location,
      participants: [],
      hosts:  req.body.hosts
    });

<<<<<<< HEAD
router.route('/:id/participant')
    .post((req, res) => {
         Event.findById(req.params.id, (err, doc) => {
             doc.participants.push('587e6bc8f2fdc76690cbeeb6');
             doc.save((err, doc) => {
                 if(err)
                    res.status(500).json(err)
                  res.status(200).send(doc);
             });
         })
    })
=======
    //save event
    event.save((err, doc) => {
      if(err){
        console.log("Oh shit, something bad happend");
        res.status(500).json(err);
      }
      else
        res.status(200).json(doc);
    });
  })
});

>>>>>>> 39a00f1135dd46c034ad199d2626d8a39d2ebd7c

export default router;