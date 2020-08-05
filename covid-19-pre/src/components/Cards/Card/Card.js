import React from 'react';
import CountUp from 'react-countup';
const card = (props) => {
    return (  
       
        <div className="card my-4">
            <div className="card-body">
                <h4 className="card-title">Infected</h4>
                <p className="card-text">Number of Active Cases:<CountUp start={0} end={1234} duration={3} separator={","}/></p>
                <p className="card-text">{new Date().toDateString()}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    );
}
 
export default card;