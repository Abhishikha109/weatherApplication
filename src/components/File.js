import {useEffect, useState} from 'react';
import Dropdown from './Dropdown';
import {CLEAR_DAY_IMG, CLEAR_NIGHT_IMG, CLOUDY_IMG, PARTLY_CLOUDY_DAY, PARTLY_CLOUDY_NIGHT} from '../constants/Urls';
const File = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherReport, setWeatherReport] = useState(null);

  const getAbc = () => {
    // const abs = weatherReport;
    console.log(weatherReport);
  };
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }

  useEffect(() => {
    getLocation();
    if (latitude && longitude) {
      fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then((response) =>
          response.json()
        ).then((data) => {
          setCurrentCity(data.address.city);
        }).catch(err => {
          console.error(err);
        });
    }
    //
    // if(currentCity){
    //   fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentCity}?unitGroup=metric&key=H4TWQN62342CA78ESWC9JJW6A&contentType=json`, {
    //     'method': 'GET',
    //     'headers': {
    //     }
    //   })
    //     .then(response => response.json())
    //     .then((responseData) => {setWeatherReport(responseData)})
    //     .catch(err => {
    //       console.error(err);
    //     }); 
    // }

    // getAbc();
    
  }, [latitude, longitude, currentCity, weatherReport, getLocation]);
  
  return <>
    <p>Hi</p>
    <br/>
    <img src={CLOUDY_IMG} alt="cloudy"/><br/>
    <img src={CLEAR_DAY_IMG} alt="clear-day"/><br/>
    <img src={CLEAR_NIGHT_IMG} height='35' width='35' alt="clear-night" /><br/>
    <img src={PARTLY_CLOUDY_NIGHT} height='35' width='44' alt="partly-cloudy-night"/><br/>
    <img src={PARTLY_CLOUDY_DAY} alt="partly-cloudy-day"/><br/>
    <p>{latitude}</p>
    <p>{longitude}</p>
    <p>{currentCity}</p>
    {/*<p>{weatherReport.queryCost}</p>*/}
  </>
};

export default File;