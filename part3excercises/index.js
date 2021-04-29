const { json } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "asdfs",
        "number": "333",
        "id": 11
    },
    {
        "name": "dfdfdfdf",
        "number": "",
        "id": 14
    },
    {
        "name": "asdf",
        "number": "",
        "id": 16
    },
    {
        "name": "",
        "number": "ddddd",
        "id": 17
    },
    {
        "name": "eererer",
        "number": "",
        "id": 18
    },
    {
        "name": "ererere",
        "number": "",
        "id": 19
    },
    {
        "name": "asdfasdferere",
        "number": "",
        "id": 20
    },
    {
        "name": "asdfasdf",
        "number": "",
        "id": 21
    },
    {
        "name": "f",
        "number": "",
        "id": 22
    },
    {
        "name": "eeeererer",
        "number": "",
        "id": 23
    }
]

const generateId = () => Math.floor(Math.random() * 1000000)

morgan.token('weener', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())

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

app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send("hello world")
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<h1>The phonebook has ${persons.length} entries</h1>
    <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    if (!person.name || !person.number) {
        res.status(400).json({ "error": "content missing" })
    }
    else if (persons.filter(perp => perp.name === person.name).length > 0) {
        res.status(400).json({ "error": "name already exists" })
    }
    else persons = persons.concat(person)
    res.json(person)
}
)

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else res.status(404).end()
})
const PORT = process.env.PORT || 3001;

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()

})
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})