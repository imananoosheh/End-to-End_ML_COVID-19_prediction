import React, { Component } from 'react';
import {getData} from '../../API';
import Header from '../../containers/Header/Header';
import classes from './Layout.module.css';
class Layout extends Component {
    state = {
        data: {}
    };
    async componentDidMount(){
        //const gotData = await getData();
        //this.setState({ data: gotData });
    };

    render = () => {
        return (
            <>
                <Header />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;