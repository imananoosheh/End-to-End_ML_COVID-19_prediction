import React from 'react';
const layout = (props) => {
    return (
        <>  
        <Header/>
        <main className={classes.Content}>
        {props.children}
        </main>
        </>
    );
}
 
export default layout;