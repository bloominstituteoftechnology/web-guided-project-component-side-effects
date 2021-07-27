import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
  // callback, 
  useEffect(() => {
    console.log('I run AFTER first render, just ONCE: 🥇')
  }, [])

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.
  useEffect(() => {
    const hiFunction = () => console.log('hi')
    // document.addEventListener('click', hiFunction)

    // run this when the component unmounts
    return () => document.removeEventListener('click', hiFunction)
  }, [])

  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
  useEffect(() => {
    console.log('running after EVERY render 🥵 ');
  })

  console.log('I am the FIRST RENDER!!')

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, shove the details of the friend in `details` slice of state

  // 👉 TASK 7 - Create a side effect 📲 that runs when friendId changes
  // (or just make a useEffect with a nice log)
  useEffect(() => {
    console.log(friendId, 'friend Id changed 📲 ')

    axios
    .get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
    .then(res => {
      setDetails(res.data)
    })

  }, [friendId]) // put a variable here so we run again when it changes


  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {details.name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
