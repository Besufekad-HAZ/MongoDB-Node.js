const database = "inventory";
const collection = "products";

const fs = require('fs');

// Creates a database
use(database);

// Drops the products collection if it exists
db.products.drop();

// Creates collection
db.createCollection(collection);

// Seed data
const productsData = [
  {name: "Smartphone", price: 499.99, category: "Electronics", description: "A high-end smartphone with advanced features.", inStock: true, colors: ["Black", "Silver", "Gold"]},
  {name: "Laptop", price: 899.95, category: "Electronics", description: "A powerful laptop for both work and entertainment.", inStock: true, colors: ["Silver", "Space Gray"]},
  {name: "Running Shoes", price: 89.99, category: "Sports", description: "Comfortable and lightweight shoes for running and training.", inStock: false, colors: ["Black", "White", "Red"]},
  {name: "Wireless Earbuds", price: 79.99, category: "Electronics", description: "True wireless earbuds with noise-cancellation technology.", inStock: true, colors: ["White", "Black", "Blue"]},
  {name: "Dress Shirt", price: 49.95, category: "Fashion", description: "A stylish dress shirt suitable for formal occasions.", inStock: true, colors: ["White", "Blue", "Pink", "Gray"]},
  {name: "Yoga Mat", price: 29.99, category: "Sports", description: "A non-slip yoga mat for comfortable workouts.", inStock: true, colors: ["Purple", "Blue", "Green"]},
  {name: "Coffee Maker", price: 69.95, category: "Appliances", description: "A programmable coffee maker for your daily brew.", inStock: false, colors: ["Black", "White"]},
  {name: "Digital Camera", price: 349.0, category: "Electronics", description: "A high-resolution digital camera for capturing memories.", inStock: true, colors: ["Black"]},
];

// Inserts seed data
db.products.insertMany(productsData);

// Logs the total number of documents in the products collection
console.log(`${database}.${collection} has ${db.products.countDocuments()} documents.`);

// Find all in stock items
const inStock = db.products.find({ inStock: true }).toArray();

// Write the results to a .txt file named products
fs.writeFileSync('playground/products.txt', JSON.stringify(inStock));

db.products.aggregate([
   { $match: {
      inStock: true,
   }},
   {$group: {
     _id: "$category",
     numProducts: {
       $sum: 1
     }
   }}
]);
