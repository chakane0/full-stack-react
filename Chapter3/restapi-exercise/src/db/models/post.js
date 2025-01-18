// import mongoose and schema class
import mongoose, { Schema } from 'mongoose';

// define a new schema for posts
const postSchema = new Schema({
    // list all properties of a blog post and their types
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
}, {timestamps:true})

// now that we have a schema, we can create a Mongoose model from it by using the mongoose.model() function
// mongoose.model() specifies the name of the collection. 
export const Post = mongoose.model('post', postSchema);

