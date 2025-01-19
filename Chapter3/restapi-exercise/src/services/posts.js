import { Post } from '../db/models/post.js';

// Using our Post model, we are creating a function that takes the required post fields, creates, and then returns a new Post. 
export async function createPost({ title, author, contents, tags }) {
    const post = new Post({ title, author, contents, tags });
    return await post.save();
};