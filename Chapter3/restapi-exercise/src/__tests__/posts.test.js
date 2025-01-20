import mongoose from 'mongoose';
import { describe, expect, test, beforeEach, afterAll} from '@jest/globals';
import { createPost, listAllPosts, listPostsByAuthor, listPostsByTag } from '../services/posts.js'
import { Post } from '../db/models/post.js';

// this function creates a new test, we can have multiple tests in here
describe('creating posts', () => {

    // this function is where we define our new test
    test('with all parameters should succeeed', async() => {
        const post = {
            title: 'Hello Mongoose!',
            author: 'Chakane Shegog',
            contents: 'this post is stored in MongoDB db using Mongoose',
            tags: ['mongoose', 'mongodb']
        }
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
        const foundPost = await Post.findById(createdPost._id);
        expect(foundPost).toEqual(expect.objectContaining(post));
        expect(foundPost.createdAt).toBeInstanceOf(Date);
    });

    test('without title should fail', async () => {
        const post = {
            author: 'Chakane Shegog',
            contents: 'Post with no title',
            tags: ['Empty']
        };

        try {
            await createPost(post);
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            expect(err.message).toContain('`title` is required');
        }
    });

    test('with minimal parameters should succeed', async () => {
        const post = {
            title: 'Only a title',
        };
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });



    
})

const samplePosts = [
    {title: 'Learning Redux', author: 'Daniel Bugl', tags: ['redux']},
    {title: 'Learn React with Hooks', author: 'Chakane Shegog', tags: ['react']},
    {
        title: 'Full-Stack React Projects',
        author: 'Daniel Bugl',
        tags: ['react', 'nodejs'],
    },
    {title: 'Guide to Typescript'}
]

// const post = require('../db/models/post.js'); // Adjust path to your Post model

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', { // Replace with your test DB URI
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close(); // Close connection after all tests
});

let createdSamplePosts = []
beforeEach(async () => {
    console.time("deleteMany");
    await Post.deleteMany({});
    console.timeEnd("deleteMany");
    
    console.time("createPosts");
    createdSamplePosts = await Promise.all(samplePosts.map(post => Post.create(post)));
    console.timeEnd("createPosts");
});

describe('listing posts',  () => {
    test('should return all posts', async () => {
        const posts = await listAllPosts();
        expect(posts.length).toEqual(createdSamplePosts.length);
    });

    test('should take into account provided sorting options', async () => {
        const posts = await listAllPosts({
            sortBy: 'updatedAt',
            sortOrder: 'ascending',
        })
        const sortedSamplePosts = createdSamplePosts.sort(
            (a, b) => a.updatedAt - b.updatedAt,
        )
        expect(posts.map((post) => post.updatedAt)).toEqual(
            sortedSamplePosts.map((post) => post.updatedAt),
        )
    });

    test('should be able to filter posts by author', async () => {
        const posts = await listPostsByAuthor('Daniel Bugl');
        expect(posts.length).toBe(3);
    });

    test('should be able to filter posts by tag', async () => {
        const posts = await listPostsByTag('nodejs');
        expect(posts.length).toBe(1);
    })
});






