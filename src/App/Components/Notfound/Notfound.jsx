import React from 'react';
import './notfound.css';
const Notfound = () => {
    return ( <React.Fragment>
        <div className="container" style={{backgroundColor:"white"}}>
<div className="notfound">
    <img src="./images/error.png" alt="" />
<h2 className="notfoubdtex">404 - Page Not Found!</h2>
<p className="tex-404">Sorry, that page doesn't exist. What would you like to do?</p>
</div>
        </div>
    </React.Fragment> );
}
 
export default Notfound;