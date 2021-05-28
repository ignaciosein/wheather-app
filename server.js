const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '4d548be3703aebfa1659953c82c4642d';

 

 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
    // NEW CODE
    res.render('index');
  })
app.post('/', function (req, res) {

   
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
                
    } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `Hay ${weather.main.temp} grados en ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }






      }
    });








  })




  


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})