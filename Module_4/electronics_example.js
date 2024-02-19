import mongoose from "mongoose";

// JavaScript object containing the cars data from the images
const ElectronicsData = [
  { "name": "Laptop", "price": 1200, "quantity": 5 },
  { "name": "Smartphone", "price": 800, "quantity": 10 },
  { "name": "Tablet", "price": 500, "quantity": 7 }
]

const insertElectronicsData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mod_4_electronicsproject");

    const ElectronicsSchema = new mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });

    const ElectronicsModel = mongoose.model("Car", ElectronicsSchema);

    await ElectronicsModel.insertMany(ElectronicsData);


    let result = await ElectronicsModel.aggregate([{
      $addFields: {
        totalValue: { $multiply: ["$price", "$quantity"] }
      }
    }
    ]);

    console.log('result', result);


  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await mongoose.connection.close();
  }
};

console.log('hello?')

insertElectronicsData();
