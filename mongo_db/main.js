import mongoose from 'mongoose';

const main = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:27017/carsproject');
    console.log('Connected to MongoDB');

    // Define a schema for the "Cars" collection
    const carSchema = new mongoose.Schema({
      brand: String,
      model: String,
      manufactureYear: Number,
      color: String
    });

    // Create a model from the schema
    const Car = mongoose.model('Car', carSchema);

    // Insert a single document into the collection using `new` and `.save()`
    const carInstance = new Car({
      brand: "Mercedes",
      model: "560 SEC",
      manufactureYear: 1999,
      color: "red"
    });
    await carInstance.save();
    console.log('Single document inserted');

    // Insert multiple documents into the collection using `insertMany`
    await Car.insertMany([
      {
        brand: "Mercedes",
        model: "S500",
        manufactureYear: 2010,
        color: "grey"
      },
      {
        brand: "Volvo",
        model: "V70",
        manufactureYear: 2015,
        color: "blue"
      }
    ]);
    console.log('Multiple documents inserted');

    // Query examples

    // Retrieve all documents in the cars collection
    let allCars = await Car.find({});
    console.log('All cars:', allCars);

    // Retrieve the first document in the cars collection
    let firstCar = await Car.findOne({});
    console.log('First car:', firstCar);

    // Retrieve all Mercedes cars
    let allMercedes = await Car.find({brand: "Mercedes"});
    console.log('All Mercedes cars:', allMercedes);

    // Retrieve the first Mercedes car
    let firstMercedes = await Car.findOne({brand: "Mercedes"});
    console.log('First Mercedes car:', firstMercedes);

    // Retrieve the first two documents
    let firstTwoCars = await Car.find().limit(2);
    console.log('First two cars:', firstTwoCars);

    // Retrieve all Mercedes except the first two
    let mercedesAfterTwo = await Car.find({brand: "Mercedes"}).skip(2);
    console.log('Mercedes cars after skipping first two:', mercedesAfterTwo);

    // Skipping the first ten documents
    let carsAfterTen = await Car.find().skip(10).limit(20);
    console.log('Cars after skipping first ten:', carsAfterTen);

    // Retrieve all Mercedes with color blue
    let blueMercedes = await Car.find({brand: "Mercedes", color: "blue"});
    console.log('Blue Mercedes:', blueMercedes);

    // Retrieve a Mercedes with color blue, only model field
    let blueMercedesModel = await Car.findOne({brand: "Mercedes", color: "blue"}, {model: 1});
    console.log('Blue Mercedes model:', blueMercedesModel);

    // Retrieve cars manufactured after 2009
    let carsAfter2009 = await Car.find({manufactureYear: { $gt: 2009 }});
    console.log('Cars manufactured after 2009:', carsAfter2009);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
};

main();
