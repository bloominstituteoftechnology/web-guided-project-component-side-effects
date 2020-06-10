const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  if (!req.query.api_key || req.query.api_key !== 'xyz') {
    res.status(403).json({ message: 'Please supply a valid api_key' })
  } else {
    next()
  }
})

const friends = [
  { id: '1', name: 'Amber', email: 'amber@amber.com', age: 32, likes: ['hiking', 'science fiction', 'sightseeing'] },
  { id: '2', name: 'Ana Rosa', email: 'anarosa@anarosa.com', age: 28, likes: ['fishing', 'cooking', 'death metal'] },
  { id: '3', name: 'Charlie', email: 'charlie@charlie.com', age: 25, likes: ['hiking', 'netflix', 'fishing'] },
  { id: '4', name: 'Deborah', email: 'deborah@deborah.com', age: 22, likes: ['heavy metal', 'netflix', 'death metal'] },
  { id: '5', name: 'Dominique', email: 'dominique@dominique.com', age: 35, likes: ['reading', 'amazon', 'bird watching'] },
  { id: '6', name: 'Khwanchai', email: 'khwanchai@khwanchai.com', age: 24, likes: ['hiking', 'heavy metal', 'heavy rock'] },
]

app.get('/friends/:id', (req, res) => {
  const friend = friends.find(fr => fr.id === req.params.id)
  if (!friend) {
    res.status(404).json({ message: 'No such friend!' })
  }
  else {
    res.json(friend)
  }
})

app.get('/friends', (req, res) => {
  res.json(friends.map(fr => ({ id: fr.id, name: fr.name })))
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
