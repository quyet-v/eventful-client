import React,{useEffect, useRef, useState} from 'react'
import { NavLink } from 'react-router-dom'
import "../../components/NavigationItem/NavigationItem.styles.css"
import Tooltip from '@mui/material/Tooltip';

const NavigationItem = ({link,logo,info}) => {
    
    const [showInfo,setShowInfo] = useState(false);
    
    return (
        <Tooltip title={info} arrow>
            <NavLink 
                style={
                    {
                        textAlign: "center",
                        width: 100
                    }
                } 
            to={link}>{logo}
            </NavLink>
        </Tooltip>
    )
}

export default NavigationItem