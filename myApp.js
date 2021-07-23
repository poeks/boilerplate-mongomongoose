require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

async function run() {
  const db = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  console.log('mongoose succesfully connected: ', !!mongoose.connection.readyState);
}

run().catch(console.dir);


const personSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number, min: 0},
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);

const readAllPersons = async () => {
    return await Person.find();
};

const personProperties = {
  'name': 'foo',
  'age': 25,
  'favoriteFoods': ['kwark', 'banana']
};

const createAndSavePerson = (done) => {

  p = new Person({...personProperties});

  // with callback:
  // p.save(function (err, p) {
  //   if (err) {
  //     return console.log(err)
  //   };
  //   done(null, p);  // It is crucial to call the callback in the Document.save callback (since Document.save() is an asynchronous operation).
  // });

  // with promise:
  p.save()
  .then(p => {done(null, p)})
  .catch(err => {console.log(err)})
};

// with async function:
const createManyPeople = async (arrayOfPeople, done) => {
  const data = await Person.create(arrayOfPeople);
  done(null, data);
};

const findPeopleByName = async (personName, done) => {
  const data = await Person.find({name: personName});
  done(null, data);
};

const findOneByFood = async (food, done) => {
  const doc = await Person.findOne({favoriteFoods: food}).exec();
  done(null, doc);
};

const findPersonById = async (personId, done) => {
  const doc = await Person.findById(personId);
  done(null, doc);
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

// The FreecodeCamp snippet has the __v attribute set to 1: that's why validation probably goes wrong.
// Returns the same object
// const findEditThenSave = async (personId, done) => {
//   const foodToAdd = "hamburger";
//   const person = await Person.findById(personId);
//   person.favoriteFoods.push(foodToAdd);

//   await Person.updateOne({_id: person._id}, person);
//   done(null,  await Person.findById(personId));  // Need to pass verification by FreeCodeCamp.
// };

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
exports.readAllPersons = readAllPersons;