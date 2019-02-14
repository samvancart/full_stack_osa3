require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(bodyParser.json())

morgan.token('body', function getContent(req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.use(express.static('build'))



// const Person = mongoose.model('Person', personSchema)




app.get('/info', (req, res) => {
    const now = new Date()
    const personsLength = persons.length
    res.send(`<p>Puhelinluettelossa ${personsLength} henkilön tiedot</p>` +
        `<p>${now}</p>`)
})


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person=>{
        res.json(person.toJSON())
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

// const generateId = () => {
//     let min = Math.ceil(6)
//     let max = Math.floor(10000)
//     let newId = Math.floor(Math.random() * (max - min)) + min;
//     return newId
// }

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === "") {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (body.number === "") {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    // const name = body.name
    // const personName = persons.find(person => person.name.toLowerCase() === name.toLowerCase())


    // if (personName) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson =>{
        res.json(savedPerson.toJSON())
    })

    
})







const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

