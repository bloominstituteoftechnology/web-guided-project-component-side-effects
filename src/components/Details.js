import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
  // console.log("It's working!!!! It's working!!!!")
  useEffect(() => {
    console.log("It's working!!!! It's working!!!!");
  }, [])

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.
  useEffect(() => {
    console.log("Such a silly listener...");
    const sillyClickListener = () => {
      console.log("Here's a random number: ", Math.random());
    }
    document.addEventListener("click", sillyClickListener);
    
    return () => {
      console.log("Cleanup Woman by Betty Wright is arguably the best song everrrrrrr!");
      document.removeEventListener("click", sillyClickListener);
    }
  }, [])

  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
  useEffect(() => {
    console.log("So much running I'm tired!");
  })

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state
  useEffect(() => {
    console.log("Fetching the friend with id: ", friendId);
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(res => {
        setDetails(res.data);
      }).catch(err => console.error(err))

    return () => {
      console.log("Old friendId was....", friendId, ". Time for a cleanup!")
    }
  }, [friendId])

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
