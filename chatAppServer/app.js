var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const Pusher = require('pusher')
const mongoose = require('mongoose');
const passport = require('passport')
const mongoSanitize = require('express-mongo-sanitize')

const chatsRouter = require('./routes/chats.routes')
const messagesRouter = require('./routes/message.routes')
const adminRouter = require('./routes/admin.routes')

require('dotenv').config()
require('./config/passport')(passport)


//Ouverture de l'application
const app = express();

//Middlewares
app.use(mongoSanitize())
app.use(passport.initialize())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configs
mongoose.connect(process.env.MONGODB_URI) //Connexion à la base de données
  .then((res) => {
    console.log("Connected to the database !");
  })
  .catch((e) => console.log("Couldn't connect to the databse", e)); 

const pusher = new Pusher({ //Parametrage du service pusher pour le rendu dynamiques des messages du chat
    appId: "1399436",
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });


const db = mongoose.connection;
db.once('open', () => {
  console.log('db connection successful');
  const messageCollection = db.collection('messages'); //Sélection de la collection à observer
  const changeStream = messageCollection.watch(); //Obeserve des changements dans notre collection messages

  changeStream.on('change', (change)=>{ //Si jamais notre collection change on effectue les actions suivantes             

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
app.use('/chats', chatsRouter);
app.use('/message', messagesRouter);
app.use('/admin', adminRouter);

module.exports = app;
