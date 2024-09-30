import clearSkyIcon from "../Assets/Icons/clearsky.png";
import partlyCloudyIcon from "../Assets/Icons/partialcloud.png";
import overcastIcon from "../Assets/Icons/cloud.png";
import fogIcon from "../Assets/Icons/fog.png";
import drizzleIcon from "../Assets/Icons/showers.png";
import rainIcon from "../Assets/Icons/rain.png";
import snowIcon from "../Assets/Icons/snow.png";
import thunderstormIcon from "../Assets/Icons/thunder.png";

import clearNightIcon from "../Assets/Icons/clearnight.png";
import partialNightIcon from "../Assets/Icons/partialnight.png";

// Weather icon mapping for day and night
const weatherIconsDay = {
  0: clearSkyIcon,
  1: partlyCloudyIcon,
  2: partlyCloudyIcon,
  3: overcastIcon,
  45: fogIcon,
  48: fogIcon,
  51: drizzleIcon,
  53: drizzleIcon,
  55: drizzleIcon,
  56: drizzleIcon,
  57: drizzleIcon,
  61: rainIcon,
  63: rainIcon,
  65: rainIcon,
  66: rainIcon,
  67: rainIcon,
  71: snowIcon,
  73: snowIcon,
  75: snowIcon,
  77: snowIcon,
  80: rainIcon,
  81: rainIcon,
  82: rainIcon,
  85: snowIcon,
  86: snowIcon,
  95: thunderstormIcon,
  96: thunderstormIcon,
  99: thunderstormIcon,
};

// Night-specific icons
const weatherIconsNight = {
  0: clearNightIcon,
  1: partialNightIcon,
  2: partialNightIcon,
};

export const getWeatherIcon = (weatherCode, hour) => {
  if (hour) {
    if (hour > "20:00" || hour < "05:00") {
      return weatherIconsNight[weatherCode] || weatherIconsDay[weatherCode];
    }
  }
  return weatherIconsDay[weatherCode];
};
