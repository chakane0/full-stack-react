import { MongoMemoryServer } from 'mongodb-memory-server';

// this function will be used to create a memory server for MongoDB
export default async function globalSetup() {

    const instance = await MongoMemoryServer.create({

        // we have to set the binary version here to the same version that weve installed for our docker container
        binary: {
            version: '6.0.4',
        }
    })

    global.__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = instance.getUri();
}