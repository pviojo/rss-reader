import React from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faSync } from "@fortawesome/free-solid-svg-icons";

const WeatherWidget = ({
  temperature,
  icon,
  city,
  feelsLike,
  loading,
  description,
  humidity,
  wind
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <FontAwesomeIcon icon={faSync} className={styles.iconLoading} spin />
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.container} ${styles.withContent}`}>
      <div className={styles.info}>
        <div className={styles.icon}>
          {icon === "sun" && (
            <FontAwesomeIcon icon={faSun} className={styles.sun} />
          )}
          {icon === "cloud" && (
            <FontAwesomeIcon icon={faCloud} className={styles.cloud} />
          )}
        </div>
        <div className={styles.temperature}>{temperature}º</div>
        <div className={styles.moreinfo}>
          <div className={styles.humidity}>Sensación Térmica: {feelsLike}º</div>
          <div className={styles.humidity}>Humedad: {humidity}%</div>
          <div className={styles.wind}>Velocidad del viento: {wind}m/s</div>
        </div>
      </div>
      <div className={styles.city}>{city}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default WeatherWidget;
