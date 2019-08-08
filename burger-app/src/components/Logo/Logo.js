import React from 'react';

import classes from '../Logo/Logo.css';

import burgerLogo from '../../assets/images/burger-logo.png';


const logo = (props) => {
    return ( 
        <div className={classes.Logo}>
        {/* because src changed by webpack */}
            <img src={burgerLogo} alt="MyBurger" />
        </div>
     );
}
 
export default logo;