import React, { useEffect } from 'react'
import "../Navigation/Navigation.styles.css"

const Navigation = ({children}) => {

    
    
    return (
    <div className='navigation'>
        {children}
       
    </div>
    )
}

export default Navigation