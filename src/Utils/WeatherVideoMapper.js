import clearSkyDay from "../Assets/Vids/ClearSkyDay.mp4";
import partialCloudsDay from "../Assets/Vids/PartialCloudsDay.mp4";
import rainStorm from "../Assets/Vids/RainStorm.mp4";
import thunderStorm from "../Assets/Vids/ThunderStorm.mp4";

import clearSkyNight from "../Assets/Vids/ClearSkyNight.mp4";
import partialCloudsNight from "../Assets/Vids/PartialCloudsNight.mp4";

import sunset from "../Assets/Vids/Sunset.mp4";
import sunrise from "../Assets/Vids/Sunrise.mp4";

// Weather icon mapping for day and night
const weatherIconsDay = {
  0: clearSkyDay,
  1: partialCloudsDay,
  2: partialCloudsDay,

  51: rainStorm,
  53: rainStorm,
  55: rainStorm,
  56: rainStorm,
  57: rainStorm,
  61: rainStorm,
  63: rainStorm,
  65: rainStorm,
  66: rainStorm,
  67: rainStorm,

  80: rainStorm,
  81: rainStorm,
  82: rainStorm,

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
  return isDay ? weatherIconsDay[weatherCode] : weatherIconsNight[weatherCode]

};
