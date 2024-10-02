import React from "react";
import styles from "./LeftSection.module.css";

import LineChart from "./LineChart/LineChart";

const LeftSection = ({ weatherData }) => {


  

  if (!weatherData) {
    return null;
  }
  return (
    <>
      <div className={styles.TemperatureSection}>
        <div className={styles.upper}>
          <p className={styles.Temperature}>{weatherData.currentTemp}°</p>
          <p className={styles.Simple}>+/-</p>
          <p className={styles.Temperature}>3</p>
        </div>
        <div className={styles.lower}>
          <p className={styles.lowerText}>9.8%</p>
          <p className={styles.smallText}>
            Wind:WSW {weatherData.windSpeed} kph
          </p>
        </div>
      </div>

      <div className={styles.dangerScore}>
        <div className={styles.uppeR}>
          <div className={styles.circles}>
            <span className={styles.colorCircles}></span>
            <span className={styles.colorCircles}></span>
            <span className={styles.colorCircles}></span>
            <span className={styles.colorCircles}></span>
            <span className={styles.colorCircles}></span>
            <span className={styles.colorCircles}></span>
          </div>
          <p className={styles.lowerText}>{weatherData.dangerLevel}%</p>
        </div>
        <div className={styles.loweR}>
          <div className={styles.colOne}>
            <p className={styles.smallText}>Safe</p>
            <p className={styles.smallText}>
              <span className={styles.smallTextCircle}></span>0.00% - 10.5%
            </p>
            <p className={styles.smallText}>
              <span className={styles.smallTextCircle}></span>10.5% - 35%
            </p>
          </div>
          <div className={styles.colTwo}>
            <p className={styles.smallText}>Dangerous</p>
            <p className={styles.smallText}>
              <span className={styles.smallTextCircle}></span>35% - 55%
            </p>
            <p className={styles.smallText}>
              <span className={styles.smallTextCircle}></span>55% - 90%
            </p>
          </div>
        </div>
      </div>
      <LineChart
        data={weatherData.todayHourTemps}
        width={"12vw"}
        height={"15vh"}
        currTemp={weatherData.currentTemp}
        currWeather={weatherData.currentWeatherCode}
        time={weatherData.timeWithoutSeconds}

      />
    </>
  );
};

export default LeftSection;
