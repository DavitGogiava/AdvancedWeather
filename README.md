# Weather App 🌦️
This is a weather application built with React, which displays live weather information for any location. The app fetches data from the Open-Meteo API, processes it, and updates the background dynamically based on the weather conditions at the selected location. The app also displays temperature, weather icons, and other key information for the next 7 days.

Features
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
  `cd AdvancedWeather`
2. Install dependencies:
   `npm install`
3. Start development server:
   `npm start`
4. Build for production:
   `npm run build`
## API Usage
This app uses the Open-Meteo API to fetch weather data. To use the API:
1. No API key is required for the Open-Meteo API.
2. The app sends a request to the Open-Meteo API to retrieve weather data based on the coordinates of the user's selected location. The coordinates are obtained using a geocoding service.

### Example API Request
Here’s an example of the API call made to Open-Meteo:
```javascript
fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
   .then(response => response.json())
   .then(data => {
       // Process the weather data
   });
```

```bash
fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
   .then(response => response.json())
   .then(data => {
       // Process the weather data
   });
```
