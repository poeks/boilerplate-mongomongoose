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

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

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