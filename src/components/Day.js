import {WeatherIcon} from '../utils/WeatherIcon';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import React, {useContext} from 'react';
import WeatherDataContext from '../store/weather-data-context';
import {celsiusToFahrenheit} from '../utils/getDayFromDate';

const Day = (props) => {
  const weatherData = useContext(WeatherDataContext);
  
  const dailyDataHandler = () => {
    const allDays = weatherData.days;
    const selectedDate = props.eachDay.datetime;

    for(let day in allDays){
      const selectedDay = allDays.at(day - 0);
      if(selectedDate === selectedDay.datetime){
        const currentWeatherData = {
          date: selectedDay.datetime,
          conditions: selectedDay.conditions,
          day: props.weekDay,
          icon: selectedDay.icon,
          temp: selectedDay.temp,
          humidity: selectedDay.humidity,
          windspeed: selectedDay.windspeed,
          sunrise: selectedDay.sunrise,
          sunset: selectedDay.sunset,
        }
        weatherData.setCurrentDataSelected(currentWeatherData);
        break;
      }
    }
  };
  
  return (<table onClick={dailyDataHandler} style={{cursor: 'pointer', border: '5px solid blue', borderRadius: '20px', margin: '10px 10px 0px 10px', padding: '0 12px'}}>
    <tbody>
      <tr><td>{props.weekDay}</td></tr>
      <tr><td>{WeatherIcon(props.eachDay.icon)}</td></tr>
      <tr>{weatherData.temperatureChange?
        <td><h6>{props.eachDay.temp} <TbTemperatureCelsius style={{color: 'blue'}}/> | <TbTemperatureFahrenheit /></h6></td> :
        <td><h6>{celsiusToFahrenheit(props.eachDay.temp)} <TbTemperatureCelsius /> | <TbTemperatureFahrenheit style={{color: 'blue'}}/></h6></td>}
      </tr>
    </tbody>
  </table>);
};

export default Day;