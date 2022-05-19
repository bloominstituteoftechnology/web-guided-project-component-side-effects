import React, { useState, useEffect } from 'react'
// 👉 TASK 1 - import the axios lib from node_modules

// 👉 TASK 2 - import the constants from constants/index.js
import {BASE_URL as url, API_KEY as apikey} from '../constants'

import Details from './Details';
import Friend from './Friend';
import axios from 'axios'; // task 1 already completed here.

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  // 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.
  useEffect(() => {
    axios.get(`${url}/friends?api_key=${apikey}`)
    .then(res => {
      console.log(res)
      setFriends(res.data)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
  },[])

  return (
    <div className='container'>
      <h1>Some of my friends:</h1>
      {/* start by mapping over the friends array...*/}
      {friends.map(friend => {
        // console.log(friend)
        return <Friend key={friend.id} info={friend} openDetails={openDetails}  />
      })}
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
