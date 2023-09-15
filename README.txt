Weather Report API

Overview:

The Weather Report API is a Node.js application that allows users to store their email addresses and locations. It provides hourly weather reports for their specified locations. This API simplifies weather data management and automated reporting.

Table of Contents:

1. Getting Started
   - Installation
   - Configuration
   - Running the API

2. Usage
   - API Endpoints
   - Sending Weather Reports



Getting Started:

- Installation

1. Clone the repository:

   git clone https://github.com/yourusername/weather-report-api.git

2. Navigate to the project directory:

   cd weather-report-api

3. Install dependencies:

   npm install

- Configuration:

The API requires configuration through environment variables. Create a .env file in the project root directory and define the following variables:

MONGODB_URI=mongodb://localhost/weather_db
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
MAILER_EMAIL=your_email@gmail.com
MAILER_PASSWORD=your_email_password

- Running the API:

Start the API server:

npm start

The API will be available at http://localhost:3000 by default.

Usage:

The Weather Report API provides the following functionality:

API Endpoints:

- POST /api/users: Store user details, including email and location.
  Example Request Body:
  {
    "email": "user@example.com",
    "location": "New York"
  }

- PUT /api/users/:userId/location: Update a user's location.

- GET /api/users/:userId/weather/:date: Retrieve weather data for a specific user and date.

Sending Weather Reports:

The API automatically sends hourly weather reports to user emails every 3 hours. Users who have stored their email addresses and locations will receive these reports.

