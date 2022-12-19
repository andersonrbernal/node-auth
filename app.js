const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./app/routes/authRoutes');
const { requireAuth, checkUser } = require('./app/libs/middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/node-auth';
const opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.set('strictQuery', true);
mongoose.connect(dbURI, opt)
  .then(result => app.listen(80))
  .catch(err => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', { title: 'Home' }));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies', { title: 'Smoothies' }));
app.use(authRoutes);
