import {WIND} from '../constants/Urls';
import WeatherDataContext from '../store/weather-data-context';
import classes from './WindSpeed.module.css';
import {useContext} from 'react';

const WindSpeed = () => {
  const weatherDataContext = useContext(WeatherDataContext);
  const windData = weatherDataContext.currentDaySelectedWindSpeed;
  
  return <table className={classes.windSpeedTable}>
    <tbody>
      <tr className={classes.row}>
        {windData.map((hour, index) =>
          <td key={index}>
            <div className={classes.column}>
              <span>{hour.at(1)} <span className={`${classes.textSpeed} ${classes.textFamily}`}>km/hr</span></span>
              <p>
                <img src={WIND} alt='wind'
                  style={{transform: `rotate(${hour.at(2)}deg)`,
                    width: '20px', height: '20px'}}/></p>
              <span className={`${classes.textSpeed} ${classes.textTime}`}>{hour.at(0)}</span>
            </div>
          </td>)}
      </tr>
    </tbody>
  </table>
};

export default WindSpeed;