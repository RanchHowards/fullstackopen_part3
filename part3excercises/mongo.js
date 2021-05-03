const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb://gram:${password}@cluster0-shard-00-00.rkkiu.mongodb.net:27017,cluster0-shard-00-01.rkkiu.mongodb.net:27017,cluster0-shard-00-02.rkkiu.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-yax6gk-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log("connected to Mongo Atlas"))
    .catch(err => console.log(err, "ERRRROR!!!!!!!!"))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => Math.floor(Math.random() * 1000000)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name,
    number,
    id: generateId(),
})

if (!person.name) {
    Person
        .find({})
        .then(persons => {
            console.log("Phonebook:")
            persons.forEach(person => console.log(person.name, person.number))
            mongoose.connection.close()
        })
}
else {
    person.save().then(result => {
        console.log('person added!')
        mongoose.connection.close()
    })
}
// let persons = [
//     {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//     },
//     {
//         "name": "asdfs",
//         "number": "333",
//         "id": 11
//     },
//     {
//         "name": "dfdfdfdf",
//         "number": "",
//         "id": 14
//     },
//     {
//         "name": "asdf",
//         "number": "",
//         "id": 16
//     },
//     {
//         "name": "",
//         "number": "ddddd",
//         "id": 17
//     },
//     {
//         "name": "eererer",
//         "number": "",
//         "id": 18
//     },
//     {
//         "name": "ererere",
//         "number": "",
//         "id": 19
//     },
//     {
//         "name": "asdfasdferere",
//         "number": "",
//         "id": 20
//     },
//     {
//         "name": "asdfasdf",
//         "number": "",
//         "id": 21
//     },
//     {
//         "name": "f",
//         "number": "",
//         "id": 22
//     },
//     {
//         "name": "eeeererer",
//         "number": "",
//         "id": 23
//     }
// ]