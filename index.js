import dotenv from 'dotenv';
import { Schema, mongoose } from "mongoose";

dotenv.config();


const uri = process.env.ATLAS_URI;
await mongoose.connect(uri);
console.log("Connected to MongoDB Atlas!");


const schema = new Schema({
   name: {
      type: String,
      required: true
   },

   breed: String,
   color: String,
});

const Cat = mongoose.model('Cat', schema);

try {
   const cat = await Cat.create({
      name: 'Snowball',
      breed: 'Tabby',
      color: 'White'
   });
   
   console.log(`Created new cat: ${JSON.stringify(cat)}`);
} catch (err) {
    console.error(`Error: ${err.message}`);
}
