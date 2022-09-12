import UserController from "../controller/UserController";

import { v4 as uuidv4 } from 'uuid';

var fakeDatabase: (any) = {};

var root = {
  getUser: ({ id }: { id: string }) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    const userRes = new UserController(id, fakeDatabase[id]);
    return userRes;
  },
  getUsers: () => {
    let Users = [];
    for (const key in fakeDatabase) {
      fakeDatabase[key].id = key;
      Users.push(fakeDatabase[key])
    }
    return Users;
  },
  createUser: ({ input }: { input: any }) => {
    // Create a random id for our "database".
    var id = uuidv4();

    fakeDatabase[id] = input;
    return new UserController(id, input);
  },
  updateUser: ({ id, input }: { id: string, input: any }) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new UserController(id, input);
  },
};

export default root;