import mongoose from 'mongoose';
import { DB_HOST } from './config.js';

//Mongoose
mongoose.connect(DB_HOST);

//Mongoose schema
const wikiSchema = new mongoose.Schema ({
    title: String,
    content: String
});

//Mongoose model
export const Article = mongoose.model('Article', wikiSchema);