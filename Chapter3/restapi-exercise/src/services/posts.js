import { Post } from '../db/models/post.js';

// Using our Post model, we are creating a function that takes the required post fields, creates, and then returns a new Post. 
export async function createPost({ title, author, contents, tags }) {
    const post = new Post({ title, author, contents, tags });
    return await post.save();
};


// this function accepts a query and options argument (sortBy). 
async function listPosts (query = {}, { sortBy = 'createdAt', sortOrder = 'descending' } = {}) {
    return await Post.find(query).sort({[sortBy]: sortOrder});
};

// now define a function to list all posts
export async function listAllPosts(options) {
    return await listPosts({}, options)
}

// create a function to list all posts by a certain author
export async function listPostsByAuthor(author, options) {
    return await listPosts({author}, options);
}

// define a function to list posts by tag
export async function listPostsByTag(tags, options) {
    return await listPosts({tags}, options)
}

// define a function to get a single post
export async function getPostById(postId) {
    return await Post.findById(postId);
}


