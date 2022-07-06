import React, {useEffect,useState} from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from "styled-components"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { getApiCall, postApiCall } from '../utils/functions';

const FriendRequestModal = ({handleClose,open}) => {
    
    const [friendRequests, setfriendRequests] = useState([])
  
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		
		
	};

	useEffect(() => {
		getApiCall(`${process.env.REACT_APP_HOST_URL}/api/friends/requests`)
		.then((res) => {
			return res.json();
		})
		.then(res => {
			setfriendRequests(res.friendRequests)
		})
	}, [])

	const handleAcceptRequest = (user) => {
	
		fetch(`${process.env.REACT_APP_HOST_URL}/api/friends/requests/accept/${user}`,{
			method:"POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`
			},
			body: JSON.stringify({user})
				
			}).then((res) => {
				
				return res.json()
			}).then((data) => {
				console.log(data)
				// setfriendRequests(data.currentRequests)
				
				setfriendRequests(data.receivedRequests)
			}).catch((error) => {
				console.log(error.message)
		})
	}

	const handleRejectRequest = (user) => {

		fetch(`${process.env.REACT_APP_HOST_URL}/api/friends/requests/reject/${user}`,{
			method:"POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${sessionStorage.getItem("token")}`
			},
			body: JSON.stringify({user}
		)
				
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			setfriendRequests(data.receivedRequests)
			
		})
		.catch((error) => {
			console.log(error.message)
		})
	}


	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">Friend Request</Typography>
				
				{friendRequests.map((user) => {
					return <FriendRequest key={user}>
					{user}
					<div>
						<Button onClick={() => {handleAcceptRequest(user)}}><DoneIcon /></Button>
						<Button onClick={() => {handleRejectRequest(user)}}><CloseIcon /></Button>
					</div>
					</FriendRequest>
				})}
			</Box>
		</Modal>
	)
}


const FriendRequest = styled.div `
    background-color: white;
    
    width: 100%;
    height: 50px;
    color: purple;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
	align-items:center;
	padding: 10px;
	border-radius: 5px;
	border: 2px solid black; 

    

`;

const Button = styled.button `
    
    width: 50px;
    height: 20px;
    cursor: pointer;
    background-color:black;
    color: white;
    border: none;
    border-radius: 5px;
    transition: all .5s;

    :hover {
      transform: scale(1.05);
    }

`;

export default FriendRequestModal