require("dotenv").config({ path: 'C:/Users/15067/Desktop/MapWorkShop/Server/.env' });
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const userRoutes = require('./routes/user-routes');
const commentRoutes = require('./routes/comment-routes');
const mapRoutes = require('./routes/map-routes');

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
                  secret: 'sk',
                  cookie: {},
                  resave: false,
                  saveUninitialized: true, 
                  store: MongoStore.create({
                  mongoUrl: process.env.MONGODB_URI,
}) }));

//  connect MongoDB
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDb!");

    if(process.env.NODE_ENV === 'production'){
      app.use(express.static('../../client/build'));
    }

  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.DEV_PORT || 8000, () => {
    console.log("Listening on port " + (process.env.DEV_PORT || 8000) + " !!!");
  });
};

start();

app.use(userRoutes);
app.use(commentRoutes);
app.use(mapRoutes);

app.all('*', async (req, res,) => {
  return res.status(404).send("Not Found Routers!");
});


const db = mongoose.connection;

db.on('error', function (err) {
  console.error(err);
});

process.on('SIGINT', async () => {
  await db.close();
  console.info('Server closed. Database instance disconnected');
  process.exit(0);
});


module.exports = app;
