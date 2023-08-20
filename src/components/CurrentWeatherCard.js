import React from 'react';
import { RiMoonClearFill, RiSunFill, RiWindyFill } from 'react-icons/ri';

function CurrentWeatherCard({ time, temperature, windSpeed, isDay }) {
    let weatherIcon;
    if (windSpeed > 5) {
        weatherIcon = <RiWindyFill size={60} />;
    } else if (isDay) {
        weatherIcon = <RiSunFill size={60} color='yellow' />;
    } else {
        weatherIcon = <RiMoonClearFill size={60} color='black' />;
    }
    const hour = new Date(time).getHours();

    return (
        <div className="current-weather-card">
            <div className="current-weather-icon">
                {weatherIcon}
            </div>
            <div className="current-weather-details">
                <h2 className="temperature">{temperature}°C</h2>
                <p className="weather-info">Wind Speed: {windSpeed} m/s</p>
                <p className="weather-info">Time: {hour}:00</p>
            </div>
        </div>
    );
}

export default CurrentWeatherCard;
