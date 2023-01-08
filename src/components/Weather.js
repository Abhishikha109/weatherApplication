import React, {useContext, useEffect, useState} from 'react';
import classes from './Weather.module.css';
import {WiHumidity} from '@react-icons/all-files/wi/WiHumidity';
import {BsWind} from 'react-icons/bs';
import {RiSunFill} from '@react-icons/all-files/ri/RiSunFill';
import {IoIosMoon} from '@react-icons/all-files/io/IoIosMoon';
import {WeatherIcon} from '../utils/WeatherIcon';
import {DayImageChange} from '../utils/DayImageChange';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import WeatherDataContext from '../store/weather-data-context';
import {weekDays, months, celsiusToFahrenheit, getTemperatureAndHumidity} from '../utils/Date.utils';
import LineChart from './LineChart';
import WindSpeed from './WindSpeed';

const Weather = (props) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [bgGif, setBGGif] = useState(undefined); 
  const weatherDataContext = useContext(WeatherDataContext);
  const selectedWeatherData = JSON.stringify(weatherDataContext.currentDataSelected) === '{}' ? props.todayWeather : weatherDataContext.currentDataSelected;
  const actualDay = selectedWeatherData.day;
  let month = '';

  for (const [key, value] of Object.entries(weekDays)) {
    if(key === actualDay){
      selectedWeatherData.day = value;
      break;
    }
  }

  for (const [key, value] of Object.entries(months)) {
    if(key === selectedWeatherData.date?.substr(5).substr(0,2)){
      month = value;
      break;
    }
  }

  const toFahrenheitHandler = () => {
    weatherDataContext.temperatureConversionToggle(false); // if false, means here we have to convert temp from Celsius into Fahrenheit
  };

  const toCelsiusHandler = () => {
    weatherDataContext.temperatureConversionToggle(true); // if true, means here we have to convert temp from Fahrenheit into Celsius
  };
  
  const temperatureHandler = () => {
    weatherDataContext.currentParameterSelectedHandler('temperature');
    const allDays = weatherDataContext.days;

    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedWeatherData.date === selectedDay.datetime){
        weatherDataContext.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(selectedDay, weatherDataContext.temperatureChange, 'temperature'));
        break;
      }
    }
  };
  
  const humidityHandler = () => {
    weatherDataContext.currentParameterSelectedHandler('humidity');
    const allDays = weatherDataContext.days;

    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedWeatherData.date === selectedDay.datetime){
        weatherDataContext.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(selectedDay, false, 'humidity'));
        break;
      }
    }
  };
  
  const windSpeedHandler = () => {
    weatherDataContext.currentParameterSelectedHandler('windSpeed');
    
    const allDays = weatherDataContext.days;

    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedWeatherData.date === selectedDay.datetime){
        weatherDataContext.currentDaySelectedWindSpeedHandler(getTemperatureAndHumidity(selectedDay, false, 'windSpeed'));
        break;
      }
    }
  };
  
  const timing = () => {
    setCurrentTime(props.hours);
  };
  
  useEffect(() => {
    timing();
    setBGGif(DayImageChange(currentTime.hours));
  }, [currentTime.hours]);
  
  return <>
    {bgGif}
    <div className={classes.textBlockRight}>
      <h2>{props.cityAddress}</h2>
      <h4>{month + ' ' +selectedWeatherData.date?.substr(8,10) + ', ' + selectedWeatherData.date?.substr(0,4)}</h4>
      <h4>{selectedWeatherData.conditions}</h4>
      <h4>{selectedWeatherData.day + 'day'}</h4>
    </div>
    <table className={classes.textBlockLeft}>
      <tbody>
        <tr>
          <th>{WeatherIcon(selectedWeatherData.icon)}</th>
          <th>          {weatherDataContext.temperatureChange? <h1>{selectedWeatherData.temp}
            <TbTemperatureCelsius onClick={toCelsiusHandler} className={classes.selectedTemperatureScale}/> | <TbTemperatureFahrenheit onClick={toFahrenheitHandler} className={classes.unSelectedTemperatureScale}/></h1> :
            <h1>{celsiusToFahrenheit(selectedWeatherData.temp)}
              <TbTemperatureCelsius onClick={toCelsiusHandler} className={classes.unSelectedTemperatureScale}/> | 
              <TbTemperatureFahrenheit onClick={toFahrenheitHandler} className={classes.selectedTemperatureScale}/></h1>}</th>
          <th>          <p><WiHumidity/>{selectedWeatherData.humidity} %</p>
            <p><BsWind/> {selectedWeatherData.windspeed} km/hr</p>
            <p><RiSunFill/> {selectedWeatherData.sunrise} am</p>
            <p><IoIosMoon/> {selectedWeatherData.sunset} pm</p></th>
        </tr>
      </tbody>
    </table>
    
    <table>
      <tbody>
        <tr>
          <td className={classes.box}>
            {(weatherDataContext.currentParameterSelected === 'temperature' ||
                weatherDataContext.currentParameterSelected === 'humidity') && <LineChart/>}
            {weatherDataContext.currentParameterSelected === 'windSpeed'
            &&
            <WindSpeed/>
            }
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <tbody>
        <tr>
          <td onClick={temperatureHandler}
            className={`${weatherDataContext.currentParameterSelected === 'temperature'?
              classes.selectedParameter : classes.unselectedParameter}`}>Temperature </td>
          <td onClick={humidityHandler}
            className={`${weatherDataContext.currentParameterSelected === 'humidity'?
              classes.selectedParameter : classes.unselectedParameter}`}>Humidity </td>
          <td onClick={windSpeedHandler}
            className={`${weatherDataContext.currentParameterSelected === 'windSpeed'?
              classes.selectedParameter : classes.unselectedParameter}`}>Wind Speed </td>
        </tr>
      </tbody>
    </table>
    
  </>
};

export default Weather;