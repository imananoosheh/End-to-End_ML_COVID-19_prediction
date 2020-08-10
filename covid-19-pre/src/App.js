import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import Header from '../src/containers/Header/Header';
import Cards from '../src/components/Cards/Cards';
import Chart from '../src/components/Chart/Chart';
import { getData } from '../src/API';
import CountrySelector from '../src/components/CountrySelector/CountrySelector';
import DegSelector from '../src/components/DegreeSelector/DegreeSelector';
class App extends Component {
  
  state = {
    data: {},
    country: '',
    statType:'',
    degree:''
  }
  async componentDidMount() {
    const data = await getData();

    this.setState({ data });
  }
  countryChangeHandler= async (country)=> {
    const inputData = {country};
    const data = await getData(inputData);

    this.setState({ data, country: country });
  }
  handleDegreeChange = async (degree) =>{
    const inputdata = {country:this.state.country,degree};
    const data = await getData(inputdata);
    this.setState({ data, degree:degree });
  }
  statTypeHandler = (type)=>{
    this.setState({statType:type});
  }
  render() {
    const { data, country } = this.state;

  return (
    <>
    <Header/>
    <div className="container">
     <Cards data={this.state.data} statTypeHandler={this.statTypeHandler} type={this.state.statType}/>
     <CountrySelector changedCountryHandler={this.countryChangeHandler}/>
     <DegSelector changedDegreeHandler={this.handleDegreeChange}/>
     <Chart data={this.state.data} statType={this.state.statType}/> 
     </div>
     </>
  );
  }
}

export default App;
