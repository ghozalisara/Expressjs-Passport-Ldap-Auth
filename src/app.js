/* Imports */
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import './libs/configPath';
import './config/passport/passport';

import { authenticate, isAuthenticated } from './components/users/userServices';


/** ****************** Create Express server.****  */
const app = express();
const routes = express.Router();

/** ********************** Middlewares Setup********/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cookieParser());
app.use(session({ secret: 'App', resave: true, saveUninitialized: true, cookie: { _expires: 360000 } }));

app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

/**************************** * view engine setup  *******************/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**************************** * Static files setup  *******************/
 app.use('/js', express.static(path.join(__dirname, './public/js/')));
 app.use('/js', express.static(path.join(__dirname, '../node_modules/particlesjs/dist/')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/')));
app.use('/css', express.static(path.join(__dirname, './public/css/')));

/* **************************Routes ********************/
app.use('/', routes);


// Login route for get and post
routes
    .route('/login')
    .get((req, res) => {
        res.render(path.join(__dirname, './views/login'));
    }).post(authenticate);

// Home route
routes.route('/').get(isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Logout route
routes.route('/logout').get((req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



/* Exports */

module.exports = app;
