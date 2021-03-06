/* eslint-disable no-console */
const express = require('express');

const app = express();
const cors = require('cors');
// const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const url = process.env.URI;

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('connected to Mongo Atlas'))
    .catch((err) => console.log(err, 'error connecting to MONGO DB'));

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
    res.send('hello world');
});

app.get('/info', (req, res) => {
    const date = new Date();
    Person.find({}).then((result) => {
        res.send(`<h1>The phonebook has ${result.length} entries</h1>
    <p>${date}</p>`);
    });
});

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then((result) => {
            res.send(result);
        });
});

app.post('/api/persons', (req, res, next) => {
    const { body } = req;

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    if (!person.name || !person.number) {
        res.status(400).json({ error: 'content missing' });
    } else {
        person.save()
            .then((savedPerson) => {
                res.json(savedPerson);
                console.log(savedPerson);
            })
            .catch((err) => next(err));
    }
});

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});
app.put('/api/persons/:id', (req, res, next) => {
    const person = req.body;
    const options = { new: true, runValidators: true, context: 'query' };
    Person.findByIdAndUpdate(req.params.id, person, options)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findByIdAndRemove(id)
        .then(() => {
            console.log('DELETED');
            res.status(204).end();
        })
        .catch((err) => next(err));
});

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
    // console.log(err.errors)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } if (err.name === 'ValidationError' && err.errors.name) {
        res.status(400).send(err.errors.name.message);
    } else if (err.name === 'ValidationError' && err.errors.number) {
        console.log('NUMBERERERERE');
        res.status(400).send(err.errors.number.message);
    }

    next(err);
};

app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
