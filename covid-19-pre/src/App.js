import React from 'react';
import Layout from '../src/components/Layout/Layout';
import Cards from '../src/components/Cards/Cards';
import Chart from '../src/components/Chart/Chart';
import { getData } from '../src/API';
import CountrySelector from '../src/components/CountrySelector/CountrySelector';
class App extends React.Component {
  
  state = {
    data: {},
    country: '',
  }
  async componentDidMount() {
    const data = await getData();

    this.setState({ data });
  }
  
  render() {
    const { data, country } = this.state;

  return (
    <div className="container">
     <Cards data={data}/>
     <CountrySelector/>
     <Chart/> 
     </div>
  );
  }
}

export default App;
