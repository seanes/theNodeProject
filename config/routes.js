import express from 'express';
import eventsGetRouter from '../src/api/event/routes/get_events';
import eventsPostRouter from '../src/api/event/routes/post_events';
import userPostRouter from '../src/api/user/routes/post_user';
import validateUserRouter from '../src/api/user/routes/get_validate_user';

import path from 'path';


const router = express.Router();

router.use('/api/events', eventsGetRouter);
router.use('/api/events', eventsPostRouter);
router.use('/api/user', userPostRouter);
router.use('/api/validateUser', validateUserRouter);

router.get("/login", (req, res) => {
    res.sendFile(path.dirname(process.mainModule.filename) + "/public/login.html");
});

export default router;
