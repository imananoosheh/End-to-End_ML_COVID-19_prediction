import React from 'react';
import Card from './Card/Card';
const cards = (props) => {
    return (
        <div className="container">
            <div className="card-deck">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}

export default cards;