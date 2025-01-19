import mongoose from 'mongoose';
import { describe, expect, test } from '@jest/globals';
import { createPost } from '../services/posts.js'
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