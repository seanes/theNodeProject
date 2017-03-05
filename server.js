//imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import webpack from 'webpack'
import config from './config/config';
import webpackConfig from './webpack.config';
import routes from './config/routes';
import b from './config/bootstrapping';

const app = express();
const port = process.env.PORT || 1337;

mongoose.Promise = Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// required for passport
// session secret
app.use(session({ 
        secret: 'js4life',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//to be removed
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

const compiler = new webpack(webpackConfig)

if (process.env.NODE_ENV !== 'production') {
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,stats: {colors: true},
        publicPath: webpackConfig.output.publicPath,
    }));
    app.use(require("webpack-hot-middleware")(compiler));
}

//routes
app.use(routes);

//kickstart server
app.listen(port, () => {
    mongoose.connect(config.db, config.dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(`Magic is happening on http://localhost:${port}`);
    });
});

/* NB: This is considered bad practise because if something uncaught happens the state of the
   server may have serious issues and should be restarted with fresh state.
   Do not use this in production. For now, in very early alpha, this is useful for discovering the uncaught exceptions to later
   handle these in the propper matter.
*/
process.on('uncaughtException', err => {
  console.log(err);
});

export default app;