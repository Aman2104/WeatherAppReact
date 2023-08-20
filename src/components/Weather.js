import React, { useState, useEffect } from 'react';
import WeatherCard from './HourlyWeatherCard';
import { RiSearch2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { CiLocationOn } from "react-icons/ci"
import CurrentWeatherCard from './CurrentWeatherCard';
import DailyWeather from './DailyWeather';

function Weather(props) {
  const [searchLocation, setSearchLocation] = useState("");
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  // const [currentWeather.daily, setcurrentWeather.daily] = useState(null);
  const [currentWeather, setCurrentWeather] = useState();
  const [location, setLocation] = useState("Your Current Location")
  const [startIndex, setStartIndex] = useState()
  const handleGetWeather = async () => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}&count=10&language=en&format=json`);
      if (response.ok) {
        const data = await response.json();
        const { latitude, longitude } = data.results[0];
        props.setCoordinates({ latitude, longitude });
        setLocation(searchLocation)

      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Results Found',
          text: 'No location results found for the provided address.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No Results Found',
        text: 'No location results found for the provided address.',
      });
    }
  };

  useEffect(() => {
    if (props.coordinates) {
      getWeatherData();
    }
  }, [props.coordinates]);

  const getWeatherData = async () => {
    if (!props.coordinates) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${props.coordinates.latitude}&longitude=${props.coordinates.longitude}&hourly=temperature_2m,rain,showers,snowfall,visibility,windspeed_10m&timezone=auto&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setCurrentWeather(data)
      // setHourlyWeatherData(data.hourly);
      // setcurrentWeather.daily(data.daily);
      let index = data.hourly.time.findIndex(time => time > data.current_weather.time)
      setStartIndex(index)
    } catch (error) {
      console.error('Error fetching weather data: ', error);
    }
  };

  return (
    <div>
      <div className="box">
        <div className="locationBox">
          <CiLocationOn className="locationIcon" />
          <h3 className="location">{location}</h3>
        </div>

        <div className="searchBar">
          <input type="text" className="inputText" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
          <button className="searchBtn" onClick={handleGetWeather} > <RiSearch2Line /></button>
        </div>
        {currentWeather && <CurrentWeatherCard time={currentWeather.current_weather.time} temperature={currentWeather.current_weather.temperature} windSpeed={currentWeather.current_weather.windspeed} isDay={currentWeather.current_weather.is_day} />}
        <div className="weather-list-container">
          <div className="weather-list">
            {currentWeather && currentWeather.hourly.time.slice(startIndex, startIndex + 11).map((time, index) => (
              <WeatherCard
                key={index}
                time={time}
                temperature={currentWeather.hourly.temperature_2m[index]}
                rain={currentWeather.hourly.rain[index]}
                windSpeed={currentWeather.hourly.windspeed_10m[index]}
              />
            ))}
          </div>
        </div>
        <div className="daily-weather-list">
          {currentWeather && currentWeather.daily.time.map((time, index) => (
            <DailyWeather
              key={index}
              date={time}
              maxTemp={currentWeather.daily.temperature_2m_max[index]}
              minTemp={currentWeather.daily.temperature_2m_min[index]}
              sunrise={currentWeather.daily.sunrise[index]}
              sunset={currentWeather.daily.sunset[index]}
              rainSum={currentWeather.daily.rain_sum[index]}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Weather;
