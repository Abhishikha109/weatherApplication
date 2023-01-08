import {useContext} from 'react';
import WeatherDataContext from '../store/weather-data-context';
import classes from './WindSpeed.module.css';
import {WIND} from '../constants/Urls';

const WindSpeed = () => {
  const weatherDataContext = useContext(WeatherDataContext);
  const windData = weatherDataContext.currentDaySelectedWindSpeed;
  
  return <table className={classes.windSpeedTable}>
    <tbody>
      <tr className={classes.row}>
        {windData.map((hour, index) =>
          <td key={index}>
            <div className={classes.column}>
              <span>{hour.at(1)} <span style={{fontFamily:'Arial', fontSize: '10px'}}>km/hr</span></span>
              <p><img src={WIND} alt='wind'
                style={{transform: `rotate(${hour.at(2)}deg)`,
                  width: '20px', height: '20px'}}/></p>
              <span style={{fontFamily:'Arial', fontSize: '15px'}}>{hour.at(0)}</span>
            </div>
          </td>)}
      </tr>
    </tbody>
  </table>
};

export default WindSpeed;