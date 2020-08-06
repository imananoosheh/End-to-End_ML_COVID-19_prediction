import React, { Component } from 'react';
import {getData} from '../../API';
import Header from '../../containers/Header/Header';
import classes from './Layout.module.css';
class Layout extends Component {
    render = () => {
        return (
            <>
                <Header />
                <main className={classes.Content}>
                </main>
            </>
        );
    }
}

export default Layout;