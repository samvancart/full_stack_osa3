const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
    `mongodb://samvancart:${password}@fullstack2019-persons-shard-00-00-c6ht6.mongodb.net:27017,fullstack2019-persons-shard-00-01-c6ht6.mongodb.net:27017,fullstack2019-persons-shard-00-02-c6ht6.mongodb.net:27017/test?ssl=true&replicaSet=fullstack2019-persons-shard-0&authSource=admin&retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: personName,
    number: personNumber,
})

if (process.argv.length === 3) {
    console.log('puhelinluettelo:');
    Person.find({}).then(result=>{
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close();
        process.exit(1);
    })
    
    
} else if (process.argv.length > 3){
    person.save().then(response => {
        console.log(`lisätään ${personName} numero ${personNumber} luetteloon`);
        mongoose.connection.close();
        process.exit(1)
    })
}


