import mongoose from 'mongoose';

// Define the products array
const products = [
  { "productname": "Blue Jeans", "color": "blue", "price": 1000, "brand": "Levi's", "collection": "spring" },
  { "productname": "Black Sneakers", "color": "black", "price": 800, "brand": "Adidas", "collection": "fall" },
  { "productname": "Red T-shirt", "color": "red", "price": 500, "brand": "Nike", "collection": "spring" },
  { "productname": "White Shirt", "color": "white", "price": 600, "brand": "Tommy Hilfiger", "collection": "spring" },
  { "productname": "Green Jacket", "color": "green", "price": 1200, "brand": "The North Face", "collection": "winter" },
  { "productname": "Gray Hoodie", "color": "gray", "price": 700, "brand": "Gap", "collection": "fall" },
  { "productname": "Brown Boots", "color": "brown", "price": 1500, "brand": "Timberland", "collection": "winter" },
  { "productname": "Purple Sweater", "color": "purple", "price": 850, "brand": "H&M", "collection": "fall" }
];

const main = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:27017/e-commerce');
    console.log('Connected to MongoDB');

    // Define a schema for the "Products" collection
    const productSchema = new mongoose.Schema({
      productname: String,
      color: String,
      price: Number,
      brand: String,
      collection: String
    });

    // Create a model from the schema
    const Product = mongoose.model('Product', productSchema);

    // Insert the products into the collection
    await Product.insertMany(products);
    console.log('Products inserted');

    // 1. Retrieve all documents from the "products" collection
    const allProducts = await Product.find({});
    console.log('All products:', allProducts);

    // 2. Find products that are in the "spring" collection
    const springProducts = await Product.find({ collection: "spring" });
    console.log('Spring collection products:', springProducts);

    // 3. Retrieve only the product names and prices of all products
    const productNamesAndPrices = await Product.find({}, { productname: 1, price: 1, _id: 0 });
    console.log('Product names and prices:', productNamesAndPrices);

    // 4. Find products with the color "blue"
    const blueProducts = await Product.find({ color: "blue" });
    console.log('Blue products:', blueProducts);

    // 5. Retrieve the first three products
    const firstThreeProducts = await Product.find().limit(3);
    console.log('First three products:', firstThreeProducts);

    // 6. Skip the first two products and retrieve the next two
    const skipTwoTakeTwo = await Product.find().skip(2).limit(2);
    console.log('Products after skipping first two:', skipTwoTakeTwo);

    // 7. Find products with prices greater than 1000 and in the "winter" collection
    const expensiveWinterProducts = await Product.find({ price: { $gt: 1000 }, collection: "winter" });
    console.log('Expensive winter products:', expensiveWinterProducts);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
};

main();
