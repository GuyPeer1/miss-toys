const express = require('express')
const cors = require('cors')
const app = express()

const toyService = require('./services/toy.service')

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use(express.json())

app.get('/api/toys', (req, res) => {
    const filterBy= (req.query)
    toyService.query(filterBy)
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Had issues getting toys', err);
            res.status(400).send({ msg: 'Had issues getting toys' })
        })
})

///Read GetById
app.get('/api/toys/:toyId', (req, res) => {
    const {toyId} =  req.params 
    toyService.getById(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Had issues getting toy', err);
            res.status(400).send({ msg: 'Had issues getting toy' })
        })
})

//Remove
app.delete('/api/toys/:toyId', (req, res) => {
    const {toyId} =  req.params 
    toyService.remove(toyId)
        .then(() => {
            res.end('Done!')
        })
        .catch(err => {
            console.log('Had issues deleting toy', err);
            res.status(400).send({ msg: 'Had issues deleteing toy' })
        })
})

app.post('/api/toys', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Had issues adding toy', err);
            res.status(400).send({ msg: 'Had issues adding toy' })
        })
})

app.put('/api/toys/', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Had issues updating toy', err);
            res.status(400).send({ msg: 'Had issues updating toy' })
        })
})

const port = process.env.PORT || 3030;

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})
