const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js'); // res.send({ title: 'Express' });
var pokemonRoutes = require ('./routes/pokemon.js');
var usersRouter = require('./routes/users.js');
var userPokemonRoutes = require('./routes/user_pokemon.js');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/users', usersRouter);
app.use('/api/userpokemon', userPokemonRoutes);

module.exports = app;
