import {createContext, useState} from 'react';

const WeatherDataContext = createContext({
  dates: [],
  setAllDates: () => {},
});

export const WeatherDataContextProvider = (props) => {
  const [weatherDates, setWeatherDates] = useState([]);

  const setDatesHandler = (allDates) => {
    setWeatherDates(allDates);
  };
    
  const contextValue = {
    dates: weatherDates, 
    setAllDates: setDatesHandler,
  }

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {props.children}
    </WeatherDataContext.Provider>
  );
};

export default WeatherDataContext;