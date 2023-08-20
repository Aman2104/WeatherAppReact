import React from 'react'

function DailyWeather({ date, maxTemp, minTemp, sunrise, sunset, rainSum }) {
    const formatTime = (time) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(time).toLocaleTimeString([], options);
    };

    return (
        <div className="weather-day">
            <div className="date">{date}</div>
            <div className="temperature">
                <span>Max: {maxTemp}°C</span>
                <span>Min: {minTemp}°C</span>
            </div>
            <div className="time">
                <span>Sunrise: {formatTime(sunrise)}</span>
                <span>Sunset: {formatTime(sunset)}</span>
            </div>
            <div className="rain">Rain Sum: {rainSum} mm</div>
        </div>
    )
}

export default DailyWeather