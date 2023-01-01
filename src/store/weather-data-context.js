import {createContext, useState} from 'react';

const WeatherDataContext = createContext({
  dates: [],
  setAllDates: () => {},
  temperatureChange: true,
  temperatureConversionToggle: () => {},
});

export const WeatherDataContextProvider = (props) => {
  const [weatherDates, setWeatherDates] = useState([]);
  const [temperatureToggle, setTemperatureToggle] = useState(true);

  const setDatesHandler = (allDates) => {
    setWeatherDates(allDates);
  };
  
  const setTemperatureToggleHandler = (value) => {
    setTemperatureToggle(value);
  }
    
  const contextValue = {
    dates: weatherDates, 
    setAllDates: setDatesHandler,
    temperatureChange: temperatureToggle,
    temperatureConversionToggle: setTemperatureToggleHandler,
  }

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContext;