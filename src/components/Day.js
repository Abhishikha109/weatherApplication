import {WeatherIcon} from '../utils/WeatherIcon';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import React, {useContext} from 'react';
import WeatherDataContext from '../store/weather-data-context';

const Day = (props) => {
  const weatherData = useContext(WeatherDataContext);
  
  const celsiusToFahrenheit = (cTemp) => {
    return Math.round(cTemp * 9 / 5 + 32);
  };
  
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
  
  return (<table onClick={dailyDataHandler} style={{cursor: 'pointer'}}>
    <tbody>
      <tr>{props.weekDay}</tr>
      <tr>{WeatherIcon(props.eachDay.icon)}</tr>
      <tr>
        {weatherData.temperatureChange? <h6>{props.eachDay.temp}
          <TbTemperatureCelsius style={{color: 'blue'}}/> | <TbTemperatureFahrenheit /></h6> :
          <h6>{celsiusToFahrenheit(props.eachDay.temp)}
            <TbTemperatureCelsius /> | <TbTemperatureFahrenheit style={{color: 'blue'}}/></h6>}
      </tr>
    </tbody>
  </table>);
};

export default Day;