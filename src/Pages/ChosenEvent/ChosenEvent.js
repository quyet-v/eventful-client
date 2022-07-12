import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import "../ChosenEvent/ChosenEvent.styles.css"
import { getApiCall } from '../../utils/functions'

const ChosenEvent = () => {

    const {id} = useParams();
    const [validId,setValidId] = useState(true)

    useEffect(() => {
        if(id.length < 24) {
            setValidId(false);
            return
        }
        
        getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/info/${id}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
        })
    },[])


  return (
    <div className='container'>
        {validId ? <div className='event-container'>


        </div> : <h1>No event found</h1>}

    </div>
  )
}

export default ChosenEvent