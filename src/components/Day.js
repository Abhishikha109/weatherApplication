import WeatherDataContext from '../store/weather-data-context';
import {celsiusToFahrenheit, getTemperatureAndHumidity, numberOfDays} from '../utils/Date.utils';
import {WeatherIcon} from '../utils/WeatherIcon';
import classes from './Day.module.css';
import React, {useContext, useEffect} from 'react';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';

const Day = (props) => {
  const weatherData = useContext(WeatherDataContext);
  const allDays = weatherData.days;
  const selectedDate = props.eachDay.datetime;
  
  const changeTableBackground = (color) => {
    if(weatherData.sevenDaysDate.length > 0){
      for(let i=0; i<numberOfDays;i++){
        const dateData = weatherData.sevenDaysDate.at(i);
        if (dateData.dateTime === selectedDate && dateData.selected){
          return color;
        }
      } 
    }
    return '';
  };
  
  const dailyDataHandler = () => {
    if(weatherData.sevenDaysDate.length > 0)
      for(let i=0; i<numberOfDays;i++){
        const dateData = weatherData.sevenDaysDate.at(i);
        dateData.selected = dateData.dateTime === selectedDate;
      }

    const prepareCurrentWeatherData = (selectedDay) => {
      return {
        date: selectedDay.datetime,
        conditions: selectedDay.conditions,
        day: props.weekDay,
        icon: selectedDay.icon,
        temp: selectedDay.temp,
        humidity: selectedDay.humidity,
        windspeed: selectedDay.windspeed,
        sunrise: selectedDay.sunrise,
        sunset: selectedDay.sunset,
      };
    }

    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedDate === selectedDay.datetime){
        const currentWeatherData = prepareCurrentWeatherData(selectedDay);
        weatherData.setCurrentDataSelected(currentWeatherData);
        
        if(weatherData.currentParameterSelected === 'temperature')
          weatherData.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(selectedDay, weatherData.temperatureChange, 'temperature'));
        else if(weatherData.currentParameterSelected === 'humidity')
          weatherData.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(selectedDay, weatherData.temperatureChange, 'humidity'));
        else if(weatherData.currentParameterSelected === 'windSpeed')
          weatherData.currentDaySelectedWindSpeedHandler(getTemperatureAndHumidity(selectedDay, weatherData.temperatureChange, 'windSpeed'));
        break;
      }
    }
  };
  
  useEffect(() => {
    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedDate === selectedDay.datetime){
        if(weatherData.currentParameterSelected === 'temperature')
          weatherData.currentDaySelectedTemperatureHandler(getTemperatureAndHumidity(selectedDay, weatherData.temperatureChange, 'temperature'));
        break;
      }
    }
  }, [weatherData.temperatureChange]);
  
  return (<table onClick={dailyDataHandler} className={classes.dayTable}
    style={{backgroundColor: changeTableBackground('green')}}>
    <tbody>
      <tr><td>{props.weekDay}</td></tr>
      <tr><td>{WeatherIcon(props.eachDay.icon)}</td></tr>
      <tr>{weatherData.temperatureChange?
        <td><h6>{props.eachDay.temp} <TbTemperatureCelsius className={classes.selectedTemperatureScale}/> | <TbTemperatureFahrenheit /></h6></td> :
        <td><h6>{celsiusToFahrenheit(props.eachDay.temp)} <TbTemperatureCelsius /> | <TbTemperatureFahrenheit className={classes.selectedTemperatureScale}/></h6></td>}
      </tr>
    </tbody>
  </table>);
};

export default Day;