import React from 'react';
import { RiShowersLine, RiSunFill, RiWindyFill } from 'react-icons/ri';
function WeatherCard({ time, temperature, rain, windSpeed }) {
    let weatherIcon;
    if (rain > 0) {
        weatherIcon = <RiShowersLine size={40}/>;
    } else if (windSpeed > 5) {
        weatherIcon = <RiWindyFill size={40}/>;
    } else {
        weatherIcon = <RiSunFill size={40} color='yellow'/>;
    }
    const hour = new Date(time).getHours();
    return (
        <div className="weather-card">
            <div className="weather-icon">
                {weatherIcon}
            </div>
            <div className="weather-details">
                <p>{temperature}°C</p>
                <p>Rain: {rain} mm</p>
                <p>Wind Speed: {windSpeed} m/s</p>
                <p>{hour}:00</p>
            </div>
        </div>
    );
}

export default WeatherCard;
