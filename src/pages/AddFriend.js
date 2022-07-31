import React, { useEffect } from 'react'
import { getApiCall,postApiCall } from '../utils/functions'
import styled from "styled-components"
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';



const AddFriend = () => {

    const [searchedUser, setSearchUser] = useState("");
    const [userFound, setUserFound] = useState(null);
    const [currentFriends,setCurrentFriends] = useState([]);
    const [users, setUsers] = useState()
    const [requestsSent,setRequestsSent] = useState([]);
    
    const handleInputChange = (e) => {
      setSearchUser(e.target.value)
    }

    const handleOnClick = () => {
        
        if(searchedUser != "") {
			
            getApiCall(`${process.env.REACT_APP_HOST_URL}/api/users/all`)
			.then((res) => {
				return res.json();
			})
			.then(res => {
				setUsers(res.allUsers)
			})

			getApiCall(`${process.env.REACT_APP_HOST_URL}/api/users/info`)
			.then((res) => {
				return res.json();
			})
			.then(res => {
				
				setCurrentFriends(res.friends);
				setRequestsSent(res.sentRequests);

			}) 
        }
        else {
            setUsers(null);
            setUserFound(null)
        }
        
    }

    // useEffect(() => {
    //     handleOnClick();
    // }, [searchedUser])

    const handleAddFriendClick = async (friendID) => {

        postApiCall(`${process.env.REACT_APP_HOST_URL}/api/friends/requests/send/${friendID}`)
        .then((res) => {
			return res.json();
        })
		.then(res => {
		
			setCurrentFriends(res.friends)
            setRequestsSent(res.sentRequests)
		})
    }

    const checkRequests = (user) => {
        if(requestsSent.indexOf(user._id) == -1) {
            return false;
        }

        return true;
    }

    const checkFriends = (user) => {
        if(currentFriends.indexOf(user._id) == -1) {
            return false;
        }

        return true;
    }

  return (
    
    <Container>
        <Wrapper>
            <FindControls>
                <input type="text" className="search-input" placeholder='Search for user...' onChange={handleInputChange}/>
                <FindButton onClick={(handleOnClick)}><SearchIcon /></FindButton> 
            </FindControls>
            <FoundUsers userFound={userFound}>
                {userFound == false && userFound != null && <NotFound>User not found!</NotFound>}
                
                {users != null && users.map((user) => {
                    
                    return <User key={user._id}>
                        {user.username}
                        
                        {!checkRequests(user) && !checkFriends(user) && <AddFriendButton onClick={() => handleAddFriendClick(user._id)}><PersonAddIcon /> Add</AddFriendButton>}
                        {checkFriends(user) && <HowToRegIcon />}
                        
                        {checkRequests(user) && <h3>request sent</h3>}
                    </User>
                })}
            </FoundUsers>
        </Wrapper>
    
    </Container>
    
  )
}

const Container = styled.div `

    flex-grow:1;
    background-color:#2a2d34;
    position:relative;
`
const Wrapper = styled.div `
  background-color: white;
  width: 500px;
  height: 500px;
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  margin: auto;
  border-radius:5px;
  display:flex;
  flex-direction:column;
  border: 4px solid black;
`;

const FindControls = styled.div `
  background-color: lightblue;
  padding: 15px;
  display: flex;
  justify-content: center;
`;

const FoundUsers = styled.div `
  
  display:grid;
  grid-template-columns: auto auto;
  grid-auto-rows: 50px;
  gap:15px;
  justify-content: ${props => props.userFound == false && "center"};
  padding: 15px;
 
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex-grow:1;
  overflow-y:scroll;
`;

const AddFriendButton = styled.button `
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  transition: all .5s;

  :hover {
    transform: scale(1.02); 
  }
`;

const User = styled.div `
  background-color: white;
  height: 40px;
  border-radius: 5px;
  border-bottom: 1px solid black;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding: 5px;
`;

const FindButton = styled.button `
  
  border:none;
  padding: 5px;
  cursor: pointer;
  
`;

const NotFound = styled.h1 `
  line-height: 350px;
`;

export default AddFriend