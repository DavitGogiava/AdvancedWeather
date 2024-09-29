import React from "react";
import styles from "./LineChart.module.css";
import RainIcon from "../../../Assets/Icons/rain.png";

const generateSmoothPath = (data, width, height) => {
  const maxY = Math.max(...data);
  const minY = Math.min(...data);
  const rangeY = maxY - minY || 1; 

  const points = data.map((y, i) => {
    const x = (i / (data.length - 1)) * width;
    const scaledY = height - ((y - minY) / rangeY) * height;
    return { x, y: scaledY };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const current = points[i];
    const midX = (prev.x + current.x) / 2;

    pathD += ` C ${midX} ${prev.y}, ${midX} ${current.y}, ${current.x} ${current.y}`;
  }

  return pathD;
};

const LineChart = ({ data, width = "20vw", height = "30vh", currTemp }) => {
  const chartWidth = (parseFloat(width) * window.innerWidth) / 100;
  const chartHeight = (parseFloat(height) * window.innerHeight) / 100 - 4;

  const pathD = generateSmoothPath(data, chartWidth, chartHeight);

  const maxY = Math.max(...data);
  const minY = Math.min(...data);

  const yLabels = [maxY, (minY + maxY) / 2, minY];

  return (
    <div className={styles.graph}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{marginBottom: '2vh'}}
      >
        <path d={pathD} fill="none" stroke="rgb(247,220,129)" strokeWidth="2" />
      </svg>

      <div className={styles.leftNums}>
        {yLabels.map((label, index) => (
          <p key={index} className={styles.smallText}>
            {Math.round(label)}°C
          </p>
        ))}
      </div>

      <div className={styles.bottomNums}>
        {["00:00", "06:00", "12:00", "18:00", "23:59"].map((time, index) => (
          <p key={index} className={styles.smallText}>
            {time}
          </p>
        ))}
      </div>

      <p className={styles.currTemp}>{`${currTemp}°c`}</p>
      <img src={RainIcon} alt="" className={styles.currWeather}/>
    </div>
  );
};

export default LineChart;
