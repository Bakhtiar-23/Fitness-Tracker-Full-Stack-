const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "MONGO_URI=mongodb://fitnessUser:Danyar21@localhost:27017/fitnessTracker",
  { useNewUrlParser: true }
);
mongoose.connection;

var contacts = [
  {
    name: "Arnold Schwarzenegger",
    email: "arnold@schwarzenegger.com",
    zipCode: 90069
  },
  {
    name: "Ronnie Coleman",
    email: "ronnie@ronniecoleman.com",
    zipCode: 75080
  },
  {
    name: "Jay Cutler",
    email: "jay@jaycutler.com",
    zipCode: 89310
  },
  {
    name: "Lee Haney",
    email: "lee@leehaney.com",
    zipCode: 30339
  },
  {
    name: "Phil Heath",
    email: "phil@philheath.com",
    zipCode: 80202
  }
];


Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });