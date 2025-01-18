import { initDatabase } from "./db/init.js";
import { Post } from './db/models/post.js';

// this function is an async function so we need to await it; without the await we would be trying to access the db before were connected to it
await initDatabase();


// create a new blog post by calling a new ```Post()``` object.
const post = new Post({
    title: 'Hello, world',
    author: 'Chakane Shegog',
    contents: 'This post is stored in a MongoDB database using Mongoose library.',
    tags: ['mongoose', 'mongodb'],
});

// call .save() in the blog post to save it to the database
await post.save();

// now use the .find() function to list all posts and log the result
const posts = await Post.find();
console.log(posts);

// checking the timestamp logic by updating a created blog post
const createdPost = await post.save();
await Post.findByIdAndUpdate(createdPost._id, {
    $set: { title: 'Hello, again, world...'},
})
console.log(createdPost)
