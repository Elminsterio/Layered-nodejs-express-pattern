const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(require('./server/config/config'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/MVC', { useNewUrlParser: true }, (error, res) => {
  if( error ) throw error;
  console.log('Datebase is up!');
})


app.use('/api/users', require('./server/routes/user.route'));
app.use('/api/session', require('./server/routes/session.route'));

app.get('/*', function(req, res){res.send('')});

app.use(require('./server/middlewares/errorsHandler.middleware'));


app.listen(process.env.PORT, () => console.log('Listening at port: ' + process.env.PORT))