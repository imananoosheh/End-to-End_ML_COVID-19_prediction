import React, { useState, useEffect } from 'react';
import { getPredictedData } from '../../API';
import { Line, Scatter } from 'react-chartjs-2';
const Chart = (props) => {
  let backgroundColor;
  let pointBorderColor;
  let pointHoverBackgroundColor;
  let pointHoverBorderColor;
  let borderColor;
  let pointBackgroundColor;
  let [Data, setData] = useState({});
  useEffect(() => {
    const getPre = async () => {
      const intialData = await getPredictedData()
      setData(intialData);
    }
    getPre();
  }, []); 
  switch(props.data.statType){
    case "deaths":
      backgroundColor='rgba(255, 87, 87, 1)';
      pointBorderColor='rgba(255, 0, 0, 1)';
      pointHoverBackgroundColor = 'rgba(179, 0, 0, 1)';
      pointHoverBorderColor='rgba(138, 0, 0, 1)';
      borderColor = 'rgba(255,0,0,1)';
      pointBackgroundColor='rgba(255, 0, 0, 1)';
      break;
    case "recovered":
      backgroundColor='rgba(102, 255, 102, 1)';
      pointBorderColor='rgba(0,255,0,1)';
      pointHoverBackgroundColor = 'rgba(0, 194, 0, 1)';
      pointHoverBorderColor='rgba(0, 133, 0, 1)';
      borderColor = 'rgba(0,255,0,1)';
      pointBackgroundColor ='rgba(0,255,0,1)';
      break;
    case "infected":
      backgroundColor='rgba(143, 143, 255, 1)';
      pointBorderColor='rgba(0,0,255,1)';
      pointHoverBackgroundColor = 'rgba(0, 0, 122, 1)';
      pointHoverBorderColor='rgba(0, 0, 51, 1)';
      borderColor = 'rgba(0,0,255,1)';
      pointBackgroundColor='rgba(0,0,255,1)';
      break;  
  }
  let dataobject = props.data;
  let dataArrScatter = dataobject.X.map((item,index)=>{
    let x = item[0];
    let y = dataobject.y[index]
    return {x,y};
  });
  console.log(dataArrScatter);
  let dataArrLine = dataobject.X.map((item,index)=>{
    let x = item[0];
    let y = dataobject.Y_predicted[index]
    return {x,y};
  });
  let dataSecondScatter = dataobject.nextWeek.map((item,index)=>{
    let x = dataobject.X[dataobject.X.length-1][0] + index + 1;
    let y = Math.floor(item);
    return {x,y};

  })
  console.log(dataSecondScatter);
  const data = {
    labels: ['Scatter'],
    datasets: [
      {
        type:'scatter',
        label: 'Covid-19 Stat Prediction',
        fill: false,
        backgroundColor,
        pointBorderColor,
        pointBackgroundColor,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor,
        pointHoverBorderColor,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: dataArrScatter
      },{
        type:'scatter',
        label: ' Prediction',
        fill: false,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        pointBorderColor: 'rgba(0, 0, 0, 1)',
        pointBackgroundColor: 'rgba(0, 0, 0, 1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 0, 0, 1)',
        pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: dataSecondScatter
      },{
        type:'line',
        fill:'false',
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        borderColor,
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: dataArrLine
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