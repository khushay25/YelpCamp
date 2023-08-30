const express = require('express');
const app = express();
const path = require('path');
const campground = require('./models/campground');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Database connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const camp = new campground({ title: 'My Backyard', description: 'Cheapest Camping!' });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
