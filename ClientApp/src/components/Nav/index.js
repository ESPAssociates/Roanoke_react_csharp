import React, {useState, useCallback, useMemo, useEffect} from 'react';
import Icon from './roanoke_logo.jpg';

const Nav = (props) => {  

    return (

        <div className="navbar">
            <img id="navIcon" src={Icon}></img>
            <span id="navMainline">City of Roanoke </span><span id="navTagline">Real Time Flood Inundation Application</span>
        </div>

        )
}


export default Nav;