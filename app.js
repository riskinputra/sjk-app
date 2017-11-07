const express = require('express');
const bodyParser  = require('body-parser');

const index   = require('./routers/index');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

// ------------ INDEX --------------
app.use('/', index);

app.listen(3000, function() {
  console.log('Sudah Nyambung ....!!!');
})
