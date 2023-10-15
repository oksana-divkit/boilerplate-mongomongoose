require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person1 = new Person({
    name: "Oksana",
    age: 32,
    favoriteFoods: ["olives"],
  });

  person1.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId)
    .then((person) => {
      person.favoriteFoods.push("hamburger");
      person.save(done);
    })
    .catch(done);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    done,
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("name favoriteFoods")
    .exec(done);
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
