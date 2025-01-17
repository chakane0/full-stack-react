// using Node.js to handle files on our local machine via: node.fs (filesystem) module.
// we can use this functionality to read and write files  or even use files as a simple database.


// this imports two functions needed for our purpose
import { writeFileSync, readFileSync } from 'node:fs';

// create an array of mock data
const users = [{name: 'Chakane Shegog', email: 'chakanezshegog@gmail.com'}];

// convert mock data to a string
const usersJson = JSON.stringify(users);

// save the JSON string to a file via writeFileSync
// the function takes 2 arguments: (1) the filename, (2) the string to be written in the file
writeFileSync('Backend/users.json', usersJson);

// after writing to the file we will read from it
const readUsersJson = readFileSync('Backend/users.json');
const readUsers = JSON.parse(readUsersJson);

// log the parsed array
console.log(readUsers);
