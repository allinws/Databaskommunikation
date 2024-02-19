import mongoose from "mongoose";

// JavaScript object containing the cars data from the images
const carsData = [
  { brand: "Honda", model: "Civic", manufactureYear: 2020, color: "gray" },
  {
    brand: "Volkswagen",
    model: "Jetta",
    manufactureYear: 2016,
    color: "green",
  },
  { brand: "Ford", model: "Mustang", manufactureYear: 2018, color: "silver" },
  {
    brand: "Toyota",
    model: "Highlander",
    manufactureYear: 2017,
    color: "black",
  },
  { brand: "Ford", model: "Escape", manufactureYear: 2019, color: "white" },
  { brand: "Toyota", model: "Tacoma", manufactureYear: 2015, color: "blue" },
  { brand: "Honda", model: "Accord", manufactureYear: 2020, color: "red" },
  { brand: "Toyota", model: "Sienna", manufactureYear: 2016, color: "gray" },
  { brand: "Ford", model: "Fusion", manufactureYear: 2018, color: "blue" },
  { brand: "Toyota", model: "4Runner", manufactureYear: 2017, color: "black" },
  { brand: "Honda", model: "Pilot", manufactureYear: 2019, color: "white" },
  {
    brand: "Chevrolet",
    model: "Equinox",
    manufactureYear: 2019,
    color: "green",
  },
  {
    brand: "Toyota",
    model: "Land Cruiser",
    manufactureYear: 2015,
    color: "silver",
  },
  { brand: "Ford", model: "Explorer", manufactureYear: 2020, color: "red" },
  { brand: "Honda", model: "Fit", manufactureYear: 2018, color: "blue" },
  { brand: "Toyota", model: "Camry", manufactureYear: 2018, color: "silver" },
  { brand: "Ford", model: "Focus", manufactureYear: 2016, color: "red" },
  { brand: "Toyota", model: "Corolla", manufactureYear: 2017, color: "white" },
  {
    brand: "Chevrolet",
    model: "Malibu",
    manufactureYear: 2019,
    color: "black",
  },
  { brand: "Toyota", model: "Rav4", manufactureYear: 2015, color: "blue" },
];

const insertCarsData = async () => {
  try {
    console.log('conencting...')
    await mongoose.connect("mongodb://localhost:27017/mod_4_carsproject");
    console.log("Connected to MongoDB");

    const carSchema = new mongoose.Schema({
      brand: String,
      model: String,
      manufactureYear: Number,
      color: String,
    });

    const CarModel = mongoose.model("Car", carSchema);

    await CarModel.insertMany(carsData);



    /* MATCH */

    // let resultOne = await CarModel.aggregate([
    //   { $match: { manufactureYear: 2015, color: "blue" } }
    // ]);

    // console.log('result one', resultOne, '\n');



    // let resultTwo = await CarModel.aggregate([
    //   { $match: { manufactureYear: { $gt: 2019 } } }
    // ]);

    // console.log('result two', resultTwo);




    /* PROJECT */

    // let resultProjectInclude = await CarModel.aggregate([
    //   { $match: { manufactureYear: {$gt: 2019} } }, { $project: { brand: 1, model: 1 } }
    //   ]);

    // console.log('result project', resultProjectInclude);



    // let resultProjectExclude = await CarModel.aggregate([
    //   { $match: { manufactureYear: {$gt: 2019} } }, { $project: { _id: 0, brand: 0, color: 0 } }
    //   ]);

    // console.log('result project', resultProjectExclude);




    /* ADD FIELDS */

    // let result = await CarModel.aggregate([
    //   { $match: { manufactureYear: {$gt: 2019} } }, {
    //           $addFields: {
    //               carname: { $concat: ["$brand", " ", "$model"] }
    //   } }
    //   ]);

    // console.log('result project', result);






    /* GROUP */

    // let resultGrouped = await CarModel.aggregate([{ $group: { _id: "$brand" } }
    // ]);

    // console.log('result grouped', resultGrouped);




    // let resultGroupedWithYear = await CarModel.aggregate([
    //   { $group: { _id: "$brand", minYear: {"$min": "$manufactureYear"} } }
    //   ]);

    // console.log('result grouped with year', resultGroupedWithYear);




    // let resultGroupMinAndMaxYear = await CarModel.aggregate([{
    //   $group: {
    //     _id: "$brand",
    //     minYear: { "$min": "$manufactureYear" },
    //     maxYear: { "$max": "$manufactureYear" }
    //   }
    // }
    // ]);

    // console.log('result grouped with year', resultGroupMinAndMaxYear);




    // let resultWithAverage = await CarModel.aggregate([{
    //   $group: {
    //     _id: "$brand",
    //     minYear: { "$min": "$manufactureYear" },
    //     maxYear: { "$max": "$manufactureYear" },
    //     averageYear: { "$avg": "$manufactureYear" }
    //   }
    // }
    // ]);

    // console.log('result grouped with year', resultWithAverage);


    /* AGGREGATION */

    // let resultAverageAggregation = await CarModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$brand",
    //       minYear: { $min: "$manufactureYear" },
    //       maxYear: { $max: "$manufactureYear" },
    //       averageYear: { $avg: "$manufactureYear" },
    //       sumYear: { $sum: "$manufactureYear" },
    //       numberOfDocs: { $sum: 1 }
    //     }
    //   },
    //   {
    //     $addFields: {
    //       myAverage: { $divide: ["$sumYear", "$numberOfDocs"] }
    //     }
    //   }
    // ]);
    
    // console.log('result grouped with year', resultAverageAggregation);




  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await mongoose.connection.close();
  }
};

console.log('hello?')

insertCarsData();
