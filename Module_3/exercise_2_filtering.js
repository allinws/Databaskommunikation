import mongoose from "mongoose";

// JavaScript object containing the cars data from the images
const booksData = [
  {
    title: 'The Odyssey',
    author: 'Homer',
    publicationYear: -800,
    genres: ['Epic', 'Adventure'],
    ratings: [4.3, 4.5, 4.2]
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    publicationYear: 1818,
    genres: ['Gothic', 'Science Fiction'],
    ratings: [4.4, 4.2, 4.6]
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publicationYear: 1937,
    genres: ['Fantasy', 'Adventure'],
    ratings: [4.6, 4.9, 4.4]
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
    publicationYear: 1977,
    genres: ['Horror', 'Thriller'],
    ratings: [4.5, 4.3, 4.8]
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    publicationYear: 1997,
    genres: ['Fantasy', 'Young Adult'],
    ratings: [4.8, 4.9, 4.7]
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    publicationYear: 2008,
    genres: ['Dystopian', 'Science Fiction'],
    ratings: [4.6, 4.5, 4.2]
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    publicationYear: 2006,
    genres: ['Post-Apocalyptic', 'Dystopian'],
    ratings: [4.2, 4.4, 4.1]
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    publicationYear: 1988,
    genres: ['Fiction', 'Philosophical'],
    ratings: [4.7, 4.5, 4.9]
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel Garcia Marquez',
    publicationYear: 1967,
    genres: ['Magical Realism', 'Historical Fiction'],
    ratings: [4.6, 4.8, 4.7]
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publicationYear: 1932,
    genres: ['Dystopian', 'Science Fiction'],
    ratings: [4.5, 4.2, 4.6]
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    publicationYear: 1954,
    genres: ['Fantasy', 'Adventure'],
    ratings: [4.9, 4.8, 4.7]
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publicationYear: 1813,
    genres: ['Classic', 'Romance'],
    ratings: [4.7, 4.6, 4.5]
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publicationYear: 1951,
    genres: ['Fiction', 'Coming of Age'],
    ratings: [4.5, 4.8, 4.2]
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationYear: 1960,
    genres: ['Fiction', 'Drama'],
    ratings: [4.7, 4.9, 4.5]
  },
  {
    title: '1984',
    author: 'George Orwell',
    publicationYear: 1949,
    genres: ['Dystopian', 'Political Fiction'],
    ratings: [4.6, 4.4, 4.9]
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publicationYear: 1925,
    genres: ['Classic', 'Romance'],
    ratings: [4.8, 4.7, 4.3]
  }
];

// Define the Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publicationYear: Number,
  genres: [String],
  ratings: [Number]
});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

const main = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:27017/booksdb');
    
    // Insert the books data into the collection
    await Book.insertMany(booksData);

    // Find books with 'Fiction' in their genres
    const fictionBooks = await Book.find({ genres: { $in: ["Fiction"] } });
    console.log('Books with Fiction genre:', fictionBooks);

    // Find books without 'Science Fiction' in their genres
    const nonSciFiBooks = await Book.find({ genres: { $nin: ["Science Fiction"] } });
    console.log('Books without Science Fiction genre:', nonSciFiBooks);

    // Find books with any rating greater than 4.8
    const highlyRatedBooks = await Book.find({ ratings: { $gt: 4.8 } });
    console.log('Highly rated books (ratings > 4.8):', highlyRatedBooks);

    // Find books published after 1960 with a rating over 4.7 and 'Fiction' in their genres
    const recentHighlyRatedFictionBooks = await Book.find({
      $and: [
        { publicationYear: { $gt: 1960 } },
        { ratings: { $gt: 4.7 } },
        { genres: { $in: ["Fiction"] } }
      ]
    });
    console.log('Recent, highly rated fiction books:', recentHighlyRatedFictionBooks);

    // Find books published in 1960, with any rating over 4.9, or 'Fiction' in their genres
    const mixedCriteriaBooks = await Book.find({
      $or: [
        { publicationYear: 1960 },
        { ratings: { $gt: 4.9 } },
        { genres: { $in: ["Fiction"] } }
      ]
    });
    console.log('Books matching mixed criteria:', mixedCriteriaBooks);

    // Find books not published after 1899 or without 'Fiction' and 'Science Fiction' in their genres
    const excludedCriteriaBooks = await Book.find({
      $nor: [
        { publicationYear: { $gte: 1900 } },
        { genres: { $in: ["Fiction"] } },
        { genres: { $in: ["Science Fiction"] } }
      ]
    });
    console.log('Books excluded by criteria:', excludedCriteriaBooks);

    // Find books with all ratings below 4.5
    const lowerRatedBooks = await Book.find({
      ratings: { $not: { $gte: 4.5 } }
    });
    console.log('Books with all ratings below 4.5:', lowerRatedBooks);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the connection to the database
    await mongoose.connection.close();
  }
};

main();
