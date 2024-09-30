import React from "react";
import styles from "./RightSection.module.css";
import { getWeatherIcon } from "../../Utils/WeatherIconMapper";

const RightSection = ({ weatherData, isLoading }) => {

  return (
    <div className={styles.RightSection}>
      {isLoading && !weatherData? (
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.textSection}>
            <p className={styles.Author}>
              Built by <br></br>Davit Gogiava
            </p>
            <div className={styles.WeatherText}>
              <p className={styles.smallText}>Weather Forecast</p>
              <h1 className={styles.bigText}>
                Storm <br></br> with Heavy Rain
              </h1>
            </div>

            <div className={styles.detailedForecast}>
              <p className={styles.smallText}>
                {`${weatherData.city}, ${weatherData.todayDate}, ${weatherData.timeWithoutSeconds}`}
              </p>
            </div>
          </div>
          <div className={styles.timeForecast}>
            <div className={styles.timeOne}>
              {weatherData.hoursArray.slice(0, 12).map((hour, index) => (
                <div className={styles.timeItem} key={index}>
                  <div className={styles.infoContainer}>
                    <img
                      src={getWeatherIcon(
                        weatherData.hourWeatherCodes[index],
                        hour
                      )}
                      className={styles.timeIcon}
                      alt=""
                    />
                    <p className={styles.timeTemp}>
                      {weatherData.hourTemps[index]}°
                    </p>
                  </div>
                  <p className={styles.time}>{hour}</p>
                </div>
              ))}
            </div>
            <div className={styles.timeTwo}>
              {weatherData.hoursArray.slice(12, 24).map((hour, index) => (
                <div className={styles.timeItem} key={index}>
                  <div className={styles.infoContainer}>
                    <img
                      src={getWeatherIcon(
                        weatherData.hourWeatherCodes[index],
                        hour
                      )}
                      className={styles.timeIcon}
                      alt=""
                    />
                    <p className={styles.timeTemp}>
                      {weatherData.hourTemps[index + 12]}°
                    </p>
                  </div>
                  <p className={styles.time}>{hour}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.line}>
            <div className={styles.leftLine}></div>
            <p>7 Day Forecast</p>
            <div className={styles.rightLine}></div>
          </div>

          <div className={styles.NearbyForecastWrapper}>
            {weatherData.next7Days.map((day, index) => (
              <div className={styles.NearbyForecastCard} key={index}>
                <div className={styles.temp}>
                  <div className={styles.dayTemp}>
                    <p className={styles.word}>Max</p>
                    <p className={styles.cel}>
                      {weatherData.MaxTemps[index]}°
                    </p>{" "}
                    {/* Max temperature */}
                  </div>
                  <div className={styles.nightTemp}>
                    <p className={styles.word}>Min</p>
                    <p className={styles.cel}>
                      {weatherData.MinTemps[index]}°
                    </p>{" "}
                    {/* Min temperature */}
                  </div>
                </div>
                <div className={styles.day}>
                  <p>{day}</p>
                  
                  <img
                    src={getWeatherIcon(weatherData.DailyWeatherCodes[index])}
                    className={styles.weatherIcon}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RightSection;
