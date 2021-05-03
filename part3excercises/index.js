const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))


const url = process.env.URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("connected to Mongo Atlas"))
    .catch(err => console.log(err, "error connecting to MONGO DB"))

// morgan.token('weener', function (req, res) { return JSON.stringify(req.body) })


// app.use(morgan((function (tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms',
//         tokens['weener'](req, res),
//     ].join(' ')
// })))


app.get('/', (req, res) => {
    res.send("hello world")
})

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(result => {
        res.send(`<h1>The phonebook has ${result.length} entries</h1>
    <p>${date}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(result => {
            res.send(result)
        })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    if (!person.name || !person.number) {
        res.status(400).json({ "error": "content missing" })
    }

    else person.save()
        .then(savedPerson => {
            res.json(savedPerson)
            console.log(savedPerson)
        }
        )
        .catch(err => next(err))
}
)

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).
        then(result => {
            res.json(result)
        })
        .catch(err => {
            next(err)
        })
}
)
app.put('/api/persons/:id', (req, res, next) => {
    const person = req.body

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(result => {
            res.json(result)
        })
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            console.log("DELETED")
            res.status(204).end()
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})