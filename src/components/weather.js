import React, {useContext, useEffect, useState} from 'react';
import classes from './weather.module.css';
import {WiHumidity} from '@react-icons/all-files/wi/WiHumidity';
import {BsWind} from 'react-icons/bs';
import {RiSunFill} from '@react-icons/all-files/ri/RiSunFill';
import {IoIosMoon} from '@react-icons/all-files/io/IoIosMoon';
import {WeatherIcon} from '../utils/WeatherIcon';
import {DayImageChange} from '../utils/DayImageChange';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import WeatherDataContext from '../store/weather-data-context';

const Weather = (props) => {
  const [currentTime, setCurrentTime] = useState({date: '', day: '', hours: 0});
  const [bgGif, setBGGif] = useState(undefined); 
  const temperatureChange = useContext(WeatherDataContext);
  
  const celsiusToFahrenheit = (cTemp) => {
    return cTemp * 9 / 5 + 32;
  };

  const toFahrenheitHandler = () => {
    temperatureChange.temperatureConversionToggle(false);
  };

  const toCelsiusHandler = () => {
    temperatureChange.temperatureConversionToggle(true);
  };
  
  const timing = () => {
    const currentDay = Date().toLocaleString();
    const date = new Date();
    const totalHours = date.getHours();
    setCurrentTime({date: currentDay.substr(4,11), day: currentDay.substr(0,4), hours: totalHours});
  };
  
  useEffect(() => {
    timing();
    setBGGif(DayImageChange(currentTime.hours));
  }, [currentTime.hours]);
  
  return <>
    <div className={classes.container}>
      {bgGif}
      <div className={classes.textBlockRight}>
        <h2>{props.cityAddress}</h2>
        <h4>{currentTime.date}</h4>
        <h4>{currentTime.day.trim() + 'day'}</h4>
      </div>
      <table className={classes.textBlockLeft}>
        <tr>
          <th>{WeatherIcon(props.todayWeather.icon)}</th>
          <th>          {temperatureChange.temperatureChange? <h1>{props.todayWeather.temp}
            <TbTemperatureCelsius onClick={toCelsiusHandler} style={{cursor: 'pointer', color: 'blue'}}/> | <TbTemperatureFahrenheit onClick={toFahrenheitHandler} style={{cursor: 'pointer'}}/></h1> :
            <h1>{celsiusToFahrenheit(props.todayWeather.temp)}
              <TbTemperatureCelsius onClick={toCelsiusHandler} style={{cursor: 'pointer'}}/> | <TbTemperatureFahrenheit onClick={toFahrenheitHandler} style={{cursor: 'pointer', color: 'blue'}}/></h1>}</th>
          <th>          <p><WiHumidity/>{props.todayWeather.humidity} %</p>
            <p><BsWind/> {props.todayWeather.windspeed} km/hr</p>
            <p><RiSunFill/> {props.todayWeather.sunrise} am</p>
            <p><IoIosMoon/> {props.todayWeather.sunset} pm</p></th>
        </tr>
      </table>
    </div>
  </>
};

export default Weather;