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
    return (

        <div className="card my-4">
            <div className={["card-body",cn].join(' ')}>
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">Number of Active Cases:<CountUp start={0} end={props.value} duration={3} separator={","} /></p>
                <p className="card-text">{new Date().toDateString()}</p>
                <p className="card-text"><small className="text-muted">Last updated {Math.floor(Math.random() * 59) + 1} mins ago</small></p>
            </div>
        </div>
    );
}

export default card;