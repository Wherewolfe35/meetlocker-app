
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const eventRouter = require('./routes/event.router');
const logRouter = require('./routes/log.router');
const commentRouter = require('./routes/comment.router');
const leaderboardRouter = require('./routes/leaderboard.router');
const animalRouter = require('./routes/animal.router');
const adminRouter = require('./routes/admin.router');

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
app.use('/api/event', eventRouter);
app.use('/api/log', logRouter);
app.use('/api/comment', commentRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/animal', animalRouter);
app.use('/api/admin', adminRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
