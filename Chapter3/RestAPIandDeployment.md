# Building and Deploying a full stack app with a Rest API

This section will cover 3 chapters
* Implementing a backend using Express, Mongoose ODM, and Jest
* Integrating a frontend using React and TanStack query
* Deploying the application with Docker and CI/CD


### Implementing the backend with: Express, Mongoose ODM, and Jest
With what we have leared about MongoDB and Node.js so far, we should be able to now build a backend service using Express to provide a REST API. Mongoose ```object data modeling``` (ODM) will be an interface for our MongoDB and Jes will be used to test our code.

This section will show us how to: 
* Design a backend service
* Create a DB schema using Mongoose
* Develop and test service functions
* Provide REST API using express

#### Designing a backend service
To design such a service we will start with an architecture pattern called MVC ```model-view-controller```. It consists of:
1. Model: Data and basic logic
2. Controller: Controls how data is processed and displayed
3. View: Displays the current state

In modern applications, the frontend is mainly interactive and the backend is used for rendering through server side rendering. Therefore, we often distinguish between the actual backend service(s) and the backend for frontend service(s). Because of this, the backend service should only deal with processing and serving requests and data; it should not render the user interface. Because of this the MVC pattern has become altered a little bit. We should now consider:

1. Route Layer: Defines routes that consumers can access + handles user input by processing the request parameters and body and then calling service functions.
2. Service Layer: Provides service functions such as CRUD functions which access the DB through the data layer
3. Data Layer: Deals with accessing the DB and does basic validation to ensure the DB is consistent. 

##### Creating the folder structure for our backend service
Within the /src folder have this setup
Folder: db
Folder: services
Folder: routes
Folder: backend

Our first application will be a blog application. The API should do the following:
1. Get a list of posts
2. Get a single post
3. Create a new post
4. Update an existing post
5. Delete an existing post

To provide these function we need to use a db schema to define what a blog post object should look like. Then we need service functions to handle CRUD functionality. Then use our REST API to query, create, update, and delete the blog posts. 


###### Creating db schemas using Mongoose
Mongoose is a library that simplifies MongoDB object modeling by reducing boilerplate code. 

First install the Mongoose library:
```npm install mongoose@8.0.2```

Next, create a new /src/db/init.js file and import mongoose
```import mongoose from 'mongoose'```

Inside that file, define and export a function to initialize a database connection
```export function initDatabase() {}```

Now define the ```DATABASE_URL``` to point to our MongoDB instance running via Docker and specify blog as the database name
```const DATABASE_URL = 'mongodb://localhost:27017/blog'```.

Then, add a listener to the open event on the Mongoose connection so that we can show a log for successful connection. Then use ```mongoose.connect(arg1)``` to actually connect.

```
mongoose.connection.on('open', () => {
    console.info('connection to db successful: ', DATABASE_URL);
})
const connection = mongoose.connect(DATABASE_URL);
return connection;
```

Now create a /src/example.js so we can see our Mongoose connect to our db. Just import the function we created above and execute it.

```
import { initDatabase } from './db/init.js';
initDatabase();
```

Now we have a db for our site that is controlled via Node.js.

#### Defining a model for blog posts
Now we need to define the data structure for blog posts. Blog posts should have:
* Title
* Author
* Contents
* Other tags associated with the post

1. Create a new /src/db/models folder
2. In that new folder create a new /src/db/models/post.js

```
// import mongoose and schema class
import mongoose, { Schema } from 'mongoose';

// define a new schema for posts
const postSchema = new Schema({
    // list all properties of a blog post and their types
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
})

// now that we have a schema, we can create a Mongoose model from it by using the mongoose.model() function
// mongoose.model() specifies the name of the collection. 
export const Post = mongoose.model('post', postSchema);
```
Now we can start using the model to create and query posts.

###### Using the blog post model
Lets first access the model inside example.js only because we have no defined any service functions or routes yet. 

Heres an example of how to achieve this (by modifying the example.js file): 

```
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

```
Now when we run this example.js file, we will see in our docker console that a new object was created and stored in our database. 

By now, we have seen how using Mongoose is just a wrapper for MongoDB. 

##### Defining creation and last update dates in the blog post
We need to utilize the ```{timestamps:true}``` property in each newly created post to add timestamps for our posts. So within the post.js file inside out /db/models/ folder we will need to add that new property to our post schema.

```
const postSchema = new Schema (
    {
        title: String,
        author: String,
        contents: String,
        tags: [String],
    },
    { timestamps: true },
)
```

#### Developing and testing service functions
Now we are at a point to where any code we write, we just test it by executing a node script. Now that were going to be writing service functions, we should use Jest to write actual tests for our code.

Jest is a test runner which will define and execute unit tests. The mongodb-memory-server library will let us create a new instance of the MongoDB database , storing our data only in memory so that we can run our tests on a fresh database instance. 

###### Setting up the test environment
1. Install Jest  and mongo db memory server into your project
```npm install --save-dev jest@29.7.0```
```npm install --save-dev mongodb-memory-server@9.1.1```

2. Create a /src/tests folder to put our tests in
3. In the new tests folder, create a file called globalSetup.js. What is this for?

