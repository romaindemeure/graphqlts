import db from '../config/config';
import { User } from '../entity/User';
import { ObjectID } from 'mongodb';

const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');

dotenv.config();

interface UserInput {
  email: string
  first_name: string
  last_name: string
  description: string
  password: string
}

class UserController {
  // Todo: Use DTO (automapper) a la place de faire tout a la main
  // https://www.npmjs.com/package/object-mapper

  // CREATE USER
  static createUser = async ({ input }: { input: UserInput }) => {
    const user = new User();

    user.email = input.email.toLocaleLowerCase();
    user.first_name = input.first_name.toLocaleLowerCase();
    user.last_name = input.last_name.toLocaleLowerCase();
    user.description = input.description;

    try {
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(input.password, salt);;
      } catch (error) {
        console.log(error.message)
    }
  
    user.created_at = Date.now().toString();
    user.updated_at = Date.now().toString();

    await db.manager.save(user);
    

    return UserController.getUserByEmail(input.email);
  };

  // GET USER BY EMAIL
  static getUserByEmail = async (email: string) => {
    let user = await db.manager.findOneBy(User, {
      email: email
    })
    return user;
  };

  // GET USER BY ID
  static getUserById = async (id: ObjectID) => {
    let convertID = new ObjectID(id);
    let user = await db.manager.findOneBy(User, convertID);
    return user;
  };

  // DELETE USER BY ID
  static deleteUserById = async (id: ObjectID) => {
    let convertID = new ObjectID(id);
    let user = await db.manager.delete(User, convertID);
  };

  // DELETE USER BY EMAIL
  static deleteUserByEmail = async (email: string) => {
    let user = await db.getMongoRepository(User).deleteOne({
      email: { $eq: email },
    })
  };

  // UPDATE USER BY EMAIL
  static updateUserByEmail = async (email: string, input) => {

    input.updated_at = Date.now().toString();

    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        input[key] = input[key].toLocaleLowerCase();
      }
    }

    let user = await db.getMongoRepository(User).update({
        "email": email
    }, input);
    
    return UserController.getUserByEmail(email);
    // return user;
  };

  // UPDATE USER BY ID
  static updateUserById = async (id: ObjectID, input) => {
    let convertID = new ObjectID(id);

    // console.log(id)
    input.updated_at = Date.now().toString();

    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        input[key] = input[key].toLocaleLowerCase();
      }
    }

    let user = await db.getMongoRepository(User).update({
        "id": convertID
    }, input);
    
    return UserController.getUserById(id);
    // return user;
  };

  // GET ALL USERS
  static getUsers = async () => {
    let users = await db.getMongoRepository(User).find();
    return users;
  };
  
  // LOGIN
  static login = async (email: string, password: string) => {

    let header = {
      "alg": "HS256",
      "typ": "JWT"
    };


    let user = await db.manager.findOneBy(User, {
      email: email
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      const jwt = require('jsonwebtoken');

      let key = process.env.ACCES_TOKEN_SECRET;

      let token = jwt.sign({ foo: 'bar' }, key, { algorithm: 'RS256' });

      user.jwt = token

      console.log(token)
      
      return user
    }
  }
};

export default UserController;