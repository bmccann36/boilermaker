const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
// const api = require('./api')
const server = require('http').createServer();

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(volleyball)

// Any routes or other various middlewares should go here!
// app.use('/api', api )

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public'));
});


server.on('request', app);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.use( (err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'internal server error')
})
