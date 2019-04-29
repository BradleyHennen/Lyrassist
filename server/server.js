var moment = require('moment');
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const datamuseRouter = require('./routes/datamuse.router');
const websterRouter = require('./routes/webster.router');
const querylistRouter = require('./routes/selector.router');
const lyricRouter = require('./routes/lyric.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/datamuse', datamuseRouter);
app.use('/api/webster', websterRouter);
app.use('/api/selector', querylistRouter);
app.use('/api/lyric', lyricRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
