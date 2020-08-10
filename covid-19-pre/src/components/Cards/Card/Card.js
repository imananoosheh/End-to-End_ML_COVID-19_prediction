import React from 'react';
import CountUp from 'react-countup';
import classes from './Card.module.css';
const card = (props) => {
    let cn = "";
    switch (props.classnumber) {
        case "1":
            cn = classes.infected
            break;
        case "2":
            cn = classes.recovered
            break;
        case "3":
            cn = classes.dead
            break;
    }
    if(props.cardTitle==props.type){
        cn=[cn,classes.Activated].join(' ');
    }
    return (

        <div className="card my-4" onClick={props.onClick}>
            <div className={["card-body",cn].join(' ')}>
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">Number of Active Cases:  <CountUp start={0} end={props.value} duration={3} separator={","} /></p>
                <p className="card-text">{new Date().toDateString()}</p>
            </div>
        </div>
    );
}

export default card;