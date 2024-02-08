import mongoose from 'mongoose';

// JavaScript object containing the cars data from the images
const carsData = [
    { brand: "Honda", model: "Civic", manufactureYear: 2020, color: "gray" },
    { brand: "Volkswagen", model: "Jetta", manufactureYear: 2016, color: "green" },
    { brand: "Ford", model: "Mustang", manufactureYear: 2018, color: "silver" },
    { brand: "Toyota", model: "Highlander", manufactureYear: 2017, color: "black" },
    { brand: "Ford", model: "Escape", manufactureYear: 2019, color: "white" },
    { brand: "Toyota", model: "Tacoma", manufactureYear: 2015, color: "blue" },
    { brand: "Honda", model: "Accord", manufactureYear: 2020, color: "red" },
    { brand: "Toyota", model: "Sienna", manufactureYear: 2016, color: "gray" },
    { brand: "Ford", model: "Fusion", manufactureYear: 2018, color: "blue" },
    { brand: "Toyota", model: "4Runner", manufactureYear: 2017, color: "black" },
    { brand: "Honda", model: "Pilot", manufactureYear: 2019, color: "white" },
    { brand: "Chevrolet", model: "Equinox", manufactureYear: 2019, color: "green" },
    { brand: "Toyota", model: "Land Cruiser", manufactureYear: 2015, color: "silver" },
    { brand: "Ford", model: "Explorer", manufactureYear: 2020, color: "red" },
    { brand: "Honda", model: "Fit", manufactureYear: 2018, color: "blue" },
    { brand: "Toyota", model: "Camry", manufactureYear: 2018, color: "silver" },
    { brand: "Ford", model: "Focus", manufactureYear: 2016, color: "red" },
    { brand: "Toyota", model: "Corolla", manufactureYear: 2017, color: "white" },
    { brand: "Chevrolet", model: "Malibu", manufactureYear: 2019, color: "black" },
    { brand: "Toyota", model: "Rav4", manufactureYear: 2015, color: "blue" }
  ];
  
  // Insert the cars data into the MongoDB database using the provided script structure
  const insertCarsData = async () => {
    try {
      // Connect to the MongoDB database
      await mongoose.connect('mongodb://localhost:27017/mod_3_carsproject');
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
  
      // Insert multiple documents into the collection using `insertMany`
      await Car.insertMany(carsData);
      console.log('Cars data inserted');
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      // Close the connection to the database
      await mongoose.connection.close();
    }
  };
  
  insertCarsData();
  