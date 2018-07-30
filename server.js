const express = require('express');
const hbs=require('hbs'); // handle bars
const fs = require('fs');


var app = express();
//set hbs as view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});



//middleware, call this method before actual the request function,
//and it holds until next() is called
app.use((req, res, next)=>{
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

app.use((req, res, next)=>{
  res.render('maintenance')
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
  //res.send('welcome');
  // res.send({
  //   name: 'John',
  //   age: 25
  // });

  res.render('home.hbs', {
    welcomeMessage: 'Welcome',
    pageTitle: 'About Page ---'
    //currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page ---',
    currentYear: new Date().getFullYear()
  });
});



app.listen(3000, ()=>{
  console.log('server started at 3000');
});
