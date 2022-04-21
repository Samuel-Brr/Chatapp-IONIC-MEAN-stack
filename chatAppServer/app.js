var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const Pusher = require('pusher')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats.routes')
const messagesRouter = require('./routes/message.routes')
const mongoose = require('mongoose');

var app = express();

require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configs
mongoose.connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("Connected to the database !");
  })
.catch((e) => console.log("Couldn't connect to the databse", e)); 

const pusher = new Pusher({
    appId: "1399436",
    key: "cee542e476f0a7f6c638",
    secret: "fc475b17b783db0dbee9",
    cluster: "eu",
    useTLS: true
  });

const db = mongoose.connection;

db.once('open', () => {
  console.log('db connection successful');
  const messageCollection = db.collection('messages');
  const changeStream = messageCollection.watch();
  changeStream.on('change', (change)=>{
    // console.log("what is in change ", change)
    if(change.operationType == 'insert'){
      const messageDetails = change.fullDocument;
      pusher.trigger(
        'message', 'inserted', {
          message: messageDetails.message,
          chat_id: messageDetails.chat_id,
          from: messageDetails.from,
          time: messageDetails.time
        }
      )
    }
  }) 
}) 
 

//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);
app.use('/message', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
