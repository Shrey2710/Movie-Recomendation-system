require('dotenv').config();
const express = require('express');
const { err } = require('./middleware/error');
const app = express();
const cors=require('cors')
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const connectMongo = async() => {
    try {
      const response =await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`Successfully Connected to ${response.connection.client.s.options.dbName}`);
    } catch (error) {
      console.log('could not connect to mongoDB ATLAS');
    }
  }
  connectMongo();

const movie = require('./routes/movie');

app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use(express.raw({extended:true}));
app.use(cors());
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/movie', movie);

app.get('/', (req, res) => res.send('ROOT ROUTE'));
app.use(err);

app.listen(port, () => console.log(`App listening on port ${port}!`))