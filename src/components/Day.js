import {WeatherIcon} from '../utils/WeatherIcon';
import {TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb';
import React, {useContext} from 'react';
import WeatherDataContext from '../store/weather-data-context';

const Day = (props) => {
  const weatherData = useContext(WeatherDataContext);
  
  const celsiusToFahrenheit = (cTemp) => {
    return Math.round(cTemp * 9 / 5 + 32);
  };
  
  return (<table>
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