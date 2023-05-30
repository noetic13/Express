const express = require('express');
const app = express();
const PORT = 3000;
const path=require('path')

// Middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); 
  const currentHour = currentDate.getHours();

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next();
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};


app.get("/style.css", (req,res)=> {
    res.sendFile(__dirname+'/public/style.css')
})

app.get('/', workingHoursMiddleware, (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
