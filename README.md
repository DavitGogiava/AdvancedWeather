# Weather App 🌦️
This is a weather application built with React, which displays live weather information for any location. The app fetches data from the Open-Meteo API, processes it, and updates the background dynamically based on the weather conditions at the selected location. The app also displays temperature, weather icons, and other key information for the next 7 days.

###Features
- 🌍 Location-Based Weather: Users can input a specific location, and the app will retrieve and display weather data for that location.
- 🎥 Dynamic Live Background: The app changes its background based on real-time weather conditions like sunny, rainy, or snowy weather.
- 🌡️  Detailed Weather Information: Provides data such as temperature, wind speed, humidity, and pressure.
- 📅 7-Day Forecast: Displays the minimum and maximum temperatures and weather icons for the upcoming 7 days.
- 🌙 Day & Night Mode: Adjusts icons and visual elements based on whether it’s day or night.
## Tech Stack
- Frontend: React, HTML, CSS
- API: Open-Meteo API
- Icons: PNG and SVG images for weather conditions

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
### Installation
1. Clone the repository:
  `git clone https://github.com/DavitGogiava/AdvancedWeather.git`
2. Navigate to folder
  `cd AdvancedWeather`
3. Install dependencies:
   `npm install`
4. Start development server:
   `npm start`
5. Build for production:
   `npm run build`
## API Usage
This app uses the Open-Meteo API to fetch weather data and timezonedb API to get RealTime Clock because js date time uses time from the device. To use the API:
- Open-Meteo API:
-- No API key is required for the Open-Meteo API.
-- The app sends a request to the Open-Meteo API to retrieve weather data based on the coordinates of the user's selected location. The coordinates are obtained using a `geocode.maps.co` API.
- timezonedb API:
-- Get the free API key from `https://timezonedb.com/api`
-- The app sends a request to the timezonedb API to retrieve current time of the location. The coordinates are obtained using a geocoding service `geocode.maps.co` API.

### Example API Request
Here’s an example of the API call made to Open-Meteo:
```javascript
fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
   .then(response => response.json())
   .then(data => {
       // Process the weather data
   });
```
### Filtering and Displaying Data
- Temperature: Displayed as maximum and minimum temperatures for the selected location and day.
- Background: The background changes according to weather conditions (sunny, cloudy, rainy, etc.).
- Weather Icons: Icons are selected based on the weather code received from the API for day and night conditions.

## Application structure
```md
- **src/**
  - **Assets/**
    - `Fonts` - Fonts used on website
    - `Icons` - Weather Icons
    - `Vids` - Weather videos
  - **Components/**
    - `LeftSection.` - Search bar and geocoding functionality
    - `RightSection` - Loader, dynamic background, and weather display
  - **Pages/**
    - `LandingPage.` - LandingPage component
  - **Utils/**
    - `DeviceContext.js` - Detect which device user is using to determine section structure
    - `UseRealTimeClock.js` - Get RealTime Clock from timezonedb api
    - `WeatherForecast.js` - Openmeteo api call to get the weather data and filter it
    - `WeatherIconMapper.js` - function which takes weatherCode from WeatherForecast data and returns icon for that weather
    - `WeatherTextMapper.js` - function which takes weatherCode from WeatherForecast data and returns text for that weather
    - `WeatherVideoMapper.js` - function which takes weatherCode from WeatherForecast data and returns video for that weather
  - `App.js` - Main application component
  - `index.js` - Entry point for React application
  - **styles/** - CSS files for styling components
```

## How It Works
1. Geocoding: When a user enters a location, the app uses a geocoding service (`geocode.maps.co` API) to get the coordinates (latitude, longitude) of that location.
2. Fetching Weather Data: With the coordinates, the app sends a request to Open-Meteo to fetch weather data, including temperature, precipitation, and weather codes for the selected location.
3. Dynamic Background: The app updates the background based on the weather condition code received from the API, providing a real-time visual experience.
4. 7-Day Forecast: The app shows a summary of weather for the next 7 days with icons and temperature data.

## Contributions
Contributions are welcome! Feel free to submit a pull request or report issues in the issue tracker.
