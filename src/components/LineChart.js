import {GoogleCharts} from 'google-charts';
import classes from './LineChart.module.css';
import {useContext, useEffect, useState} from 'react';
import WeatherDataContext from '../store/weather-data-context';

const LineChart = () => {
  const weatherContext = useContext(WeatherDataContext);
  const [chartData, setChartData] = useState([]);

  const drawChart = () => {
    let abc = [];
    abc.push(chartData);
    const data = GoogleCharts.api.visualization.arrayToDataTable(chartData);

    const options = {
      backgroundColor: 'transparent',
      legend: 'none',
      vAxis: {
        gridlines: {
          color: 'transparent'
        },
        textPosition: 'none',
        minValue: 0,
        baselineColor: 'none',
      },
      pointSize: 5,
      'tooltip' : {
        trigger: 'none'
      },
      series: {
        0: { color: 'white' },
      },
      hAxis: {
        textStyle:{color: 'white'}
      },
    };

    let view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' }
    ]);

    const pie_1_chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart1'));
    pie_1_chart.draw(view, options);
  };
  
  useEffect(() => {
    setChartData(weatherContext.currentDaySelectedTemperature);
  }, [weatherContext.currentDaySelectedTemperature]);
  
  useEffect(() => {
    if(weatherContext.currentDaySelectedTemperature.length > 0)
      GoogleCharts.load(drawChart);
  }, [chartData]);
  
  return <div id="chart1" className={classes.LineChartBox}>
  </div>
};

export default LineChart;