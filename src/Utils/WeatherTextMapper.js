
// Weather icon mapping for day and night
const weatherIconsDay = {
  0: ['Clear', 'sky'],
  1: ['Mainly', 'clear'],
  2: ['Partly', 'cloudy'],
  3: ['Overcast', ''],
  45: ['Fog', ''],
  48: ['Rime', 'fog'],
  51: ['Drizzle', 'with light intensity'],
  53: ['Drizzle', 'with moderate intensity'],
  55: ['Drizzle', 'with dense intensity'],
  56: ['Freezing', 'light drizzle'],
  57: ['Freezing', 'dense drizzle'],
  61: ['Rain', 'with slight intensity'],
  63: ['Rain', 'with moderate intensity'],
  65: ['Rain', 'with heavy intensity'],
  66: ['Freezing', 'light rain'],
  67: ['Freezing', 'heavy rain'],
  71: ['SnowFall', 'with slight intensity'],
  73: ['SnowFall', 'with moderate intensity'],
  75: ['SnowFall', 'with heavy intensity'],
  77: ['Snow', 'grains'],
  80: ['Rain showers', 'with slight intensity'],
  81: ['Rain showers', 'with moderate intensity'],
  82: ['Rain showers', 'with heavy intensity'],
  85: ['Snow showers', 'with slight intensity'],
  86: ['Snow showers', 'with heavy intensity'],
  95: ['Thunderstorm', 'with slight intensity'],
  96: ['Thunderstorm', 'with moderate intensity'],
  99: ['Thunderstorm', 'with heavy intensity']
};



export const getWeatherText = (weatherCode) => {

  return weatherIconsDay[weatherCode]
};
