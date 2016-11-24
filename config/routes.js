import express from 'express';
import passport from './passport'
import path from 'path';

import eventsGetRouter from '../src/api/event/routes/get_events';
import eventsPostRouter from '../src/api/event/routes/post_events';
import userPostRouter from '../src/api/user/routes/post_user';
import validateUserRouter from '../src/api/user/routes/get_validate_user';
import locationGetRouter from '../src/api/location/routes/get_location';
import locationPostRouter from '../src/api/location/routes/post_location';

const router = express.Router();


const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.use('/api/user', userPostRouter);
router.use('/api/validateUser', validateUserRouter);

router.use('/api/events', isLoggedIn, eventsGetRouter);
router.use('/api/events', isLoggedIn, eventsPostRouter);

router.use('/api/location', isLoggedIn, locationGetRouter);
router.use('/api/location', isLoggedIn, locationPostRouter);


//to be deleted:
router.get('/login', (req, res) => {
    res.sendFile(path.dirname(process.mainModule.filename) + '/public/login.html');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.get('/', (req, res) => {
    res.redirect('/login')
})

export default router;
