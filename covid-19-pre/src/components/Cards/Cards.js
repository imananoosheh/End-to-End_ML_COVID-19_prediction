import React from 'react';
import Card from './Card/Card';
const cards = (props) => {
    console.log(props.data)
    if(!props.data.confirmed){
        return <h1>Loading Data</h1>
    }
    return (
        <div className="container">
            <div className="card-deck">
                <Card classnumber="1" cardTitle="Infected" value={props.data.confirmed.value} updateTime={props.data.updateTime}/>
                <Card classnumber="2" cardTitle="Recovered" value={props.data.recovered.value} updateTime={props.data.updateTime}/>
                <Card classnumber="3" cardTitle="Deaths" value={props.data.deaths.value} updateTime={props.data.updateTime}/>
            </div>
        </div>
    );
}

export default cards;