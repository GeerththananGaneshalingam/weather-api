const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/weather_api', { useNewUrlParser: true, useUnifiedTopology: true 
});

// Defining schema and model
const User = mongoose.model('User',{
  email: String,
  location: String,
  weatherData: [{ date: Date, temperature: Number }],
});


// Defining  OpenWeatherMap API key
const openWeatherApiKey = 'Y6c3cccaeb2d6a43b0b12ef51052bb352';

// Function to fetch weather data from OpenWeatherMap
async function fetchWeather(location) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}`);
    const temperature = response.data.main.temp;
    return temperature;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Function to send weather report emails
async function sendWeatherReportEmail(email, location, temperature) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'Sivarangini.g1972@gmail.com',
      pass: 'ranja#1972',
    },
  });

  const mailOptions = {
    from: 'Sivarangini.g1972@gmail.com',
    to: email,
    subject: 'Hourly Weather Report',
    text: `Weather in ${location}: Temperature - ${temperature}°C`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Weather report email sent to:', email);
  } catch (error) {
    console.error('Error sending weather report email:', error);
  }
}

// Schedule sending hourly weather reports every 3 hours

cron.schedule('0 */3 * * *', async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const temperature = await fetchWeather(user.location);
      user.weatherData.push({ date: new Date(), temperature });
      await user.save();
      sendWeatherReportEmail(user.email, user.location, temperature);
    }
  } catch (error) {
    console.error('Error sending weather reports:', error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});