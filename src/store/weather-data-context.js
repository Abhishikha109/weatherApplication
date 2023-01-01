import {createContext, useState} from 'react';

const WeatherDataContext = createContext({
  days: [],
  setAllDays: () => {},
  temperatureChange: true,
  temperatureConversionToggle: () => {},
  currentDayCondition: {},
  setCurrentDayCondition: () => {},
});

export const WeatherDataContextProvider = (props) => {
  const [weatherDays, setWeatherDays] = useState([]);
  const [temperatureToggle, setTemperatureToggle] = useState(true);
  const [currentWeather, setCurrentWeather] = useState({});

  const setDaysHandler = (allDays) => {
    setWeatherDays(allDays);
  };

  const setCurrentDayConditionHandler = (currentDayWeatherCondition) => {
    setCurrentWeather({...currentDayWeatherCondition});
  };
  
  const setTemperatureToggleHandler = (value) => {
    setTemperatureToggle(value);
  }
  
  const contextValue = {
    days: weatherDays, 
    setAllDays: setDaysHandler,
    temperatureChange: temperatureToggle,
    temperatureConversionToggle: setTemperatureToggleHandler,
    currentDayCondition: currentWeather,
    setCurrentDayCondition: setCurrentDayConditionHandler,
  }

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContext;