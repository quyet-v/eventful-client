import React,{useEffect, useRef, useState} from 'react'
import { NavLink } from 'react-router-dom'
import "../../components/NavigationItem/NavigationItem.styles.css"

const NavigationItem = ({link,logo,info,active}) => {
    
    const [showInfo,setShowInfo] = useState(false);
   
  

    const handleItemHover = () => {
        setShowInfo(true)
    }

    const handleClick = () => {

    }
    
    return (
        <div className={ 'item-info-container'} onClick={handleClick} onMouseEnter={handleItemHover} onMouseLeave={() => setShowInfo(false)}>
            <NavLink className={"item-logo"} to={link}>{logo}</NavLink>
            <div className={showInfo ? 'item-info show-info' : 'item-info'}>{info}</div>
        </div>
    )
}

export default NavigationItem