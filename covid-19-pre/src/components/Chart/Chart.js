import React,{ useState, useEffect } from 'react';
import { getPredictedData } from '../../API';
import { Line } from 'react-chartjs-2';
const Chart = (props) => {
  const [Data,setData] = useState({});
  useEffect(()=>{
    const getPre = async () =>{
      const intialData = await getPredictedData()
      setData(intialData);
    }
    getPre();
  },[]);

  const lineChart = (
    Data[0] ? (
      <Line
        data={{
          labels: Data.map(({ date }) => date),
          datasets: [{
            data: Data.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: Data.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );
  
    return (
    <div className="container">
      {lineChart}
    </div>
    );

}
export default Chart;