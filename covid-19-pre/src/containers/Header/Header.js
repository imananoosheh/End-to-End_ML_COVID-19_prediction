import React from 'react';
import './Header.css';
const header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                <li className="nav-item">
        <a className="nav-link bold text-light" href="#">End to End ML COVID-19 Prediction</a>
            </li>
                </ul>

            </div>
        </nav>
    );
}

export default header;