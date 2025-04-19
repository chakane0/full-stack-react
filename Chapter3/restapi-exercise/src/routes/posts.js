import {
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostById,
} from '../services/posts.js';

// this function takes the express app as an argument
export function postsRoutes(app) {
    // define the routes (GET, POST, etc)

    // get all posts
    app.get('/api/v1/posts', async (req, res) => {

        // here, we can use query params to map them to the arguments of our functions. 
        const { sortBy, sortOrder, author, tag } = req.query;
        const options = { sortBy, sortOrder };

        try {

            // check if author or tag was provided
            if(author && tag) {
                return res.status(400).json({error: 'query by either author or tag, not both'});

            } 

            // return respective json
            else if(author) {
                return res.json(await listPostsByAuthor(author, options));
            }
            else if(tag) {
                return res.json(await listPostsByTag(tag, options));
            } else {
                return res.json(await listAllPosts(options));
            }
        } catch(err) {
            console.error('error listing posts', err);
            return res.status(500).end();
        }
    })

    // get single post by id
    app.get('/api/v1/posts/:id', async (req, res) => {
        // use req.params.id to get the :id part of our route and pass it to our service function
        const { id } = req.params;
        try {
            const post = await getPostById();

            // if the result is null return a 404 response, otherwise return json
            if(post === null) return res.status(404).end();
            return res.json(post);
            
        } catch(err) {
            console.error('error getting post', err);
            return res.status(500).end();
        }
    })
}