import clearSkyDay from "../Assets/Vids/ClearSkyDay.webm";
import partialCloudsDay from "../Assets/Vids/PartialCloudsDay.webm";
import overCast from "../Assets/Vids/overcast.webm";
import fog from "../Assets/Vids/fog.webm";
import drizzle from "../Assets/Vids/drizzle.webm";
import snow from "../Assets/Vids/snow.webm";

import rainStorm from "../Assets/Vids/RainStorm.webm";
import thunderStorm from "../Assets/Vids/ThunderStorm.webm";

import clearSkyNight from "../Assets/Vids/ClearSkyNight.webm";
import partialCloudsNight from "../Assets/Vids/PartialCloudsNight.webm";

// Weather icon mapping for day and night
const weatherIconsDay = {
  0: clearSkyDay,
  1: partialCloudsDay,
  2: partialCloudsDay,
  3: overCast,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  56: drizzle,
  57: drizzle,
  61: rainStorm,
  63: rainStorm,
  65: rainStorm,
  66: rainStorm,
  67: rainStorm,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  80: rainStorm,
  81: rainStorm,
  82: rainStorm,
  85: snow,
  86: snow,
  95: thunderStorm,
  96: thunderStorm,
  99: thunderStorm,
};

// Night-specific icons
const weatherIconsNight = {
  0: clearSkyNight,
  1: partialCloudsNight,
  2: partialCloudsNight,
  3: partialCloudsNight,
};

export const getWeatherVideo = (weatherCode, isDay) => {
  if (isDay) {
    return weatherIconsDay[weatherCode];
  } else {
    return weatherIconsNight[weatherCode] || weatherIconsDay[weatherCode]; // Fallback to weatherIconsDay if not found in weatherIconsNight
  }
};
