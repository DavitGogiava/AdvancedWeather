import axios from "axios";




const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


function formatDateWithoutDateFunctions(dateString) {
  const [year, month, day] = dateString.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
}


const fetchWeatherData = async (time, latitude, longitude) => {
  const timeWithoutMinutes = time.split(":").slice(0, 1).join(":");
  const timeWithoutSeconds = time.split(":").slice(0, 2).join(":");

  const indx = parseInt(timeWithoutMinutes, 10);

  
  

  const today = new Date();
  const todayIndex = today.getDay(); // Get today's day index (0 = Sunday, 1 = Monday, etc.)


  const params = {
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "rain",
      "showers",
      "snowfall",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "wind_speed_10m",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  try {
    const response = await axios.get(url, { params });
    const daily = response.data.daily;
    const hourly = response.data.hourly;
    const current = response.data.current;

    const selectedItems = hourly.time.slice(indx, indx + 24);
    const timeParts = selectedItems.map(item => {
      const parts = item.split("T");
      return parts[1]; // Returns the time part (second part of the string)
    });


    //current
    const currentTemp = Math.round(current.temperature_2m);
    const todayDate = formatDateWithoutDateFunctions(daily.time[0])
    const windSpeed = current.wind_speed_10m
    const currentWeatherCode = current.weather_code
    const isDay = current.is_day

    //hourly
    const todayHourTemps = hourly.temperature_2m.slice(0, 24);
    const hourTemps = hourly.temperature_2m.slice(indx, indx + 24).map(temp => Math.round(temp));
    const hourWeatherCodes = hourly.weather_code.slice(indx, indx + 24)
    const hoursArray = timeParts
    //daily
    const MaxTemps = daily.temperature_2m_max.map(temp => Math.round(temp));
    const MinTemps = daily.temperature_2m_min.map(temp => Math.round(temp));
    const DailyWeatherCodes = daily.weather_code
    const next7Days = Array.from(
      { length: 7 },
      (_, i) => daysOfWeek[(todayIndex + i) % 7]
    );


    const weatherData = {
      current: {
        temperature: current.temperature_2m,
        isDay: current.is_day,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
        windSpeed: current.wind_speed_10m,
        rain: current.rain,
        showers: current.showers,
        snowfall: current.snowfall,
      },
      daily: {
        time: daily.time,
        weatherCode: daily.weather_code,
        maxTemperatures: daily.temperature_2m_max,
        minTemperatures: daily.temperature_2m_min,
        sunrise: daily.sunrise,
        sunset: daily.sunset,
      },
      hourly: {
        time: hourly.time,
        temperatures: hourly.temperature_2m,
        humidity: hourly.relative_humidity_2m,
        weatherCodes: hourly.weather_code,
        windSpeeds: hourly.wind_speed_10m,
        precipitation: hourly.precipitation,
        rain: hourly.rain,
        showers: hourly.showers,
        snowfall: hourly.snowfall,
      },
    };

    const smallData = {
      currentTemp,
      currentWeatherCode,
      isDay,
      todayDate,
      timeWithoutSeconds,
      windSpeed,
      hourTemps,
      todayHourTemps,
      hourWeatherCodes,
      hoursArray,
      MinTemps,
      MaxTemps,
      next7Days,
      DailyWeatherCodes
    }


    return smallData;
  } catch (err) {
    throw new Error("Error fetching weather data: " + err.message);
  }
};

export default fetchWeatherData;
