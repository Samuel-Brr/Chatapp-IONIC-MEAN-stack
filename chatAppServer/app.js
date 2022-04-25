var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const Pusher = require('pusher')
const Chat =require('./models/chat.model')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats.routes')
const messagesRouter = require('./routes/message.routes')
const adminRouter = require('./routes/admin.routes')
const mongoose = require('mongoose');
const passport = require('passport')
require('dotenv').config()
require('./config/passport')(passport)

var app = express();

//Middlewares
app.use(passport.initialize())
app.use(cors());
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
          _id: messageDetails._id,
          message: messageDetails.message,
          chat_id: messageDetails.chat_id,
          from: messageDetails.from,
          time: messageDetails.time
        }
      )
    }
    else if(change.operationType == 'delete'){
      pusher.trigger('message', 'deleted',{})
    }
    else if(change.operationType == 'update'){
      const messageDetails = change.updateDescription.updatedFields.message;
      pusher.trigger(
        'message', 'updated', {
          message: messageDetails
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
app.use('/admin', adminRouter);

module.exports = app;
