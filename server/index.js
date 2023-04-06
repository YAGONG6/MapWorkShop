const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Counter= require('./model/CounterSchema');
const app = express();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

var id = 0;
// Connect to MongoDB
console.log(process.env.MONGODB_URI || "mongodb+srv://gyg19981217:Gyg19981217!@cluster0.rbr3eig.mongodb.net/Count")
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
  const newCounter = new Counter({ counter: 0 })
  newCounter.save().then(res=>
    
    {id=res._id.toString();
      console.log(res)
    console.log(id)});
})


// Enable CORS
app.use(cors());

// Add middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use(express.static(path.join(__dirname, '../client/build')));

// Define your API routes here

// Catch-all route that sends back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/count');
app.use('/inc');

app.get('/count',  async (req, res) => {

  console.log(1234566756);
  const data = await Counter.findOne({_id:id});
  console.log(data)
  res.status(200).json({ counter: 5  });
});

app.get('/inc',  async (req, res) => {
  console.log(6756);
  const data = await Counter.findOneAndUpdate({_id:id},{ $inc: { counter: 1 } }, { returnDocument: "after" });
  console.log(data)
  res.status(200).json({ counter: 10  });
});
// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
