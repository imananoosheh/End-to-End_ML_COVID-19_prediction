import React, { useState, useEffect } from 'react';
import { getPredictedData } from '../../API';
import { Line, Scatter } from 'react-chartjs-2';
const Chart = (props) => {
  const [Data, setData] = useState({});
  useEffect(() => {
    const getPre = async () => {
      const intialData = await getPredictedData()
      setData(intialData);
    }
    getPre();
  }, []); 
  const data = {
    labels: ['Scatter'],
    datasets: [
      {
        label: 'Covid-19 Stat Prediction',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          {
            x: 65,
            y: 75
          },
          {
            x: 59,
            y: 49
          },
          {
            x: 80,
            y: 90
          },
          {
            x: 81,
            y: 29
          },
          {
            x: 56,
            y: 36
          },
          {
            x: 55,
            y: 25
          },
          {
            x: 40,
            y: 18
          }
        ]
      }
    ]
  };
  const lineChart = (
    Data[0] ? <Scatter data={data} /> : null
  );

  return (
    <div className="container">
      {lineChart}
    </div>
  );

}
export default Chart;