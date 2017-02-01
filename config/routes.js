import express from 'express';
import getMainPage from '../src/mainPage'

import eventsGetRouter from '../src/api/event/routes/get_events';
import eventsPostRouter from '../src/api/event/routes/post_events';
import userPostRouter from '../src/api/user/routes/post_user';
import validateUserRouter from '../src/api/user/routes/get_validate_user';
import locationsGetRouter from '../src/api/location/routes/get_location';
import locationsPostRouter from '../src/api/location/routes/post_location';

import profileGetRouter from '../src/api/profile/routes/get_profile';
import profilePostRouter from '../src/api/profile/routes/post_profile';

import adminPostRouter from '../src/api/admin/routes/post_admin';
import adminGetRouter from '../src/api/admin/routes/get_admin';

const test = process.env.NODE_ENV === 'test';

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated() || test)
        return next();
    res.status(403).send('Forbidden');
}

const isLoggedInAndAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "admin" || test)
        return next();
    res.status(403).send('Forbidden');
}

router.use('/api/user', userPostRouter);
router.use('/api/validateUser', validateUserRouter);

router.use('/api/events', isLoggedIn, eventsGetRouter);
router.use('/api/events', isLoggedIn, eventsPostRouter);

router.use('/api/locations', isLoggedIn, locationsGetRouter);
router.use('/api/locations', isLoggedIn, locationsPostRouter);

router.use('/api/me', isLoggedIn, profileGetRouter);
router.use('/api/me', isLoggedIn, profilePostRouter);

router.use('/api/admin', isLoggedInAndAdmin, adminPostRouter);
router.use('/admin', isLoggedInAndAdmin, adminGetRouter);

router.get('/forgot', (req, res) => {
    res.send(getMainPage(req.isAuthenticated()))
});

router.get('/login', (req, res) => {
  res.send(getMainPage(req.isAuthenticated()))
});

router.get('/events', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.send(getMainPage(true))
  }
});

router.get('/events/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.send(getMainPage(true))
  }
});

router.get('/signup', (req, res) => {
  res.send(getMainPage(req.isAuthenticated()))
});

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login')
  } else {
    res.send(getMainPage(true))
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  res.send(getMainPage(req.isAuthenticated()))
});

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    } else {
      res.send(getMainPage(true))
    }
})

export default router;
