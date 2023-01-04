import {GoogleCharts} from 'google-charts';
import {useEffect} from 'react';

const drawChart = () => {
  const data = GoogleCharts.api.visualization.arrayToDataTable([
    ['', ''],
    ['1am', 29],
    ['2am', 23],
    ['3am', 30],
    ['4am', 22],
    ['5am', 12],
    ['6am', 20],
    ['7am', 18],
    ['8am', 25],
    ['9am', 29],
    ['10am', 24],
    ['11am', 28],
    ['12am', 29],
  ]);

  const options = {
    backgroundColor: 'transparent',
    legend: 'none',
    vAxis: {
      gridlines: {
        color: 'transparent'
      },
      textPosition: 'none',
      minValue: 0,
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
  
  const pie_1_chart = new GoogleCharts.api.visualization.AreaChart(document.getElementById('chart1'));
  pie_1_chart.draw(view, options);
};

const LineChart = () => {
  useEffect(() => {
    GoogleCharts.load(drawChart);
  }, []);
  
  return <div id="chart1" style={{width: '115%', height: '300px'}}>
  </div>
};

export default LineChart;