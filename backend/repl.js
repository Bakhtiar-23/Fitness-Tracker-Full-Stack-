const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Course = require("./models/course");
var testCourse, testSubscriber;
mongoose.connect(
  "MONGO_URI=mongodb://fitnessUser:Danyar21@localhost:27017/fitnessTracker",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
Subscriber.remove({})
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Course.remove({});
  })
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({
      name: "Jon Wexler",
      email: "jon@jonwexler.com",
      zipCode: "12345",
      phoneNumber:56345364 
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345" 
    });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "Strength Training 101",
      description: "This course focuses on building muscle strength through various weightlifting exercises. ",
      price: 100,
      items: ["Dumbbells", "Barbells", "Resistance Bands", "Weight Plates"]
    });
  })
  .then(course => {
    testCourse = course;
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "courses");
  })
  .then(subscriber => console.log(subscriber))
  .then(() => {
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })
  .then(subscriber => console.log(subscriber));