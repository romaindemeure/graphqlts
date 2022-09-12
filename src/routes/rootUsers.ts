import UserController from './src/controller/controllerUser.ts'
import { v4 as uuidv4 } from 'uuid';

var fakeDatabase: (any) = {};

var root = {
  getUser: ({id}: {id: string}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    const userRes = new User(id, fakeDatabase[id]);
    // userRes.id = id;
    // console.log(userRes)
    return userRes;
  },
  getUsers: () => {
    let Users= [];
    for(const key in fakeDatabase) {
      fakeDatabase[key].id = key;
      Users.push(fakeDatabase[key])
    }
    return Users;
  },
  createUser: ({input}: {input: any}) => {
    // Create a random id for our "database".
    var id = uuidv4();

    fakeDatabase[id] = input;
    return new User(id, input);
  },
  updateUser: ({id, input}: {id: string, input: any}) => {
    if (!fakeDatabase[id]) {
      throw new Error('no User exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new User(id, input);
  },
};

export default {
  users: (obj, args) => {
    let value = UserController.listAll(obj, args);
    return value;
  },
  teams: (obj, args) => {
    let value = UserController.listTeams(obj, args);
    return value;
  },
  user: (obj, args, context, info) => {
    var email, value;
    if (obj.email == 'me') {
      email = args.res.locals.jwtPayload.email;
      value = UserController.getMe(email);
    } else {
      email = obj.email;
      value = UserController.getOneByEmail(email);
    }
    return value;
  },
  editUser: (obj, args, context, info) => {
    console.log('test', obj);
    var user = UserController.editUser(obj, args)
    return user
  }
};