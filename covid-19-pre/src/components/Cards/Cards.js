import React from 'react';
import Card from './Card/Card';
import classes from './Cards.module.css';
const cards = (props) => {
    console.log(props.data)
    if(!props.data.confirmed){
        return <h1>Loading Data</h1>
    }
    return (
        <div className="container">
            <div className="card-deck">
                <Card type={props.type} classnumber="1" cardTitle="Infected" onClick={()=> props.statTypeHandler("Infected")} value={props.data.confirmed.value} updateTime={props.data.updateTime}/>
                <Card type={props.type} classnumber="2" cardTitle="Recovered" onClick={()=> props.statTypeHandler("Recovered")} value={props.data.recovered.value} updateTime={props.data.updateTime}/>
                <Card type={props.type} classnumber="3" cardTitle="Deaths" onClick={()=> props.statTypeHandler("Deaths")} value={props.data.deaths.value} updateTime={props.data.updateTime}/>
            </div>
        </div>
    );
}

export default cards;