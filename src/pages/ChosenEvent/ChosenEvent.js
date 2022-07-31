import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import "../ChosenEvent/ChosenEvent.styles.css"
import { getApiCall } from '../../utils/functions'
import { Buffer } from 'buffer'
import Attendee from '../../components/Attendee/Attendee'

const ChosenEvent = () => {

    const {id} = useParams();
    const [validId,setValidId] = useState(true)
    const [event,setEvent] = useState()

    useEffect(() => {
        if(id.length < 24 || id.length > 24) {
            setValidId(false);
            return;
        }
        
        getApiCall(`${process.env.REACT_APP_HOST_URL}/api/events/info/${id}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            setEvent(res);
            
        })
    },[])


  return (
    <>
        {validId ? <div className='container'>
            <div className='event-info'>
                <div className='contact'>
                    {event && <img className='event-image' src={`data:image/png;base64,${Buffer.from(event.img.data).toString("base64")}`}></img>}
                    <h1>Contact host</h1>
                    <button>Message</button>
                    
                </div>
                <div className='info'>
                    {event && <h1>{event.name}</h1>}
                    {event && <p>Hosted at <b>{event.location}</b></p>}
                    {event && <p>Hosted by <b>{event.host}</b></p>}
                    <br></br>
                    <hr></hr>
                    <br></br>
                    {event && <p>{event.description}</p>}
                </div>
            </div>
            <div className='event-members'>
                {event && event.users.map((user) => {
                    return <Attendee key={user._id} username={user.username}></Attendee>
                })}

            </div>
        </div> : <h1>No event found</h1>}

    </>
  )
}

export default ChosenEvent