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
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
}

const calculateDanger = (
  currentTemp,
  windSpeed,
  relHumidity,
  precipitation,
  pressure,
  surPress
) => {
  const tempScore = Math.min(Math.abs((currentTemp - 22) / 50), 1) * 100;
  const windScore = Math.min(windSpeed / 100, 1) * 100;
  const humidityScore = relHumidity > 85 || relHumidity < 20 ? 100 : 0;
  const precipitationScore = Math.min(precipitation / 50, 1) * 100; // Assuming 50 mm as a threshold for heavy rain/snow
  const pressureDifference = Math.abs(pressure - surPress);
  const pressureScore =
    pressureDifference > 10 ? 100 : (pressureDifference / 10) * 100;
  const dangerPercentage =
    tempScore * 0.25 +
    windScore * 0.25 +
    humidityScore * 0.1 +
    precipitationScore * 0.2 +
    pressureScore * 0.2;
  return Math.min(dangerPercentage, 100).toFixed(1);
};

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
      "relative_humidity_2m",
      "precipitation",
      "pressure_msl",
      "surface_pressure",
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
    const timeParts = selectedItems.map((item) => {
      const parts = item.split("T");
      return parts[1]; // Returns the time part (second part of the string)
    });

    //current
    const currentTemp = Math.round(current.temperature_2m);
    const windSpeed = current.wind_speed_10m;
    const relHumidity = current.relative_humidity_2m;
    const precipitation = current.precipitation;
    const pressure = current.pressure_msl;
    const surPress = current.surface_pressure;
    const todayDate = formatDateWithoutDateFunctions(daily.time[0]);
    const currentWeatherCode = current.weather_code;
    const isDay = current.is_day;

    const dangerLevel = calculateDanger(
      currentTemp,
      windSpeed,
      relHumidity,
      precipitation,
      pressure,
      surPress
    );
    //hourly
    const todayHourTemps = hourly.temperature_2m.slice(0, 24);
    const hourTemps = hourly.temperature_2m
      .slice(indx, indx + 24)
      .map((temp) => Math.round(temp));
    const hourWeatherCodes = hourly.weather_code.slice(indx, indx + 24);
    const hoursArray = timeParts;
    //daily
    const MaxTemps = daily.temperature_2m_max.map((temp) => Math.round(temp));
    const MinTemps = daily.temperature_2m_min.map((temp) => Math.round(temp));
    const DailyWeatherCodes = daily.weather_code;
    const next7Days = Array.from(
      { length: 7 },
      (_, i) => daysOfWeek[(todayIndex + i) % 7]
    );

    const smallData = {
      currentTemp,
      currentWeatherCode,
      dangerLevel,
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
      DailyWeatherCodes,
    };

    return smallData;
  } catch (err) {
    throw new Error("Error fetching weather data: " + err.message);
  }
};

export default fetchWeatherData;
