import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';
import myDataSource from '../config/config';
import { ObjectID } from 'typeorm';

interface UserInput {
  _id: ObjectID
  email: string
  first_name: string
  last_name: string
  description: string
}

class UserController {
  // Todo: Use DTO (automapper) a la place de faire tout a la main
  // https://www.npmjs.com/package/object-mapper

  static createUser = async ({ input }: { input: UserInput }) => {
    const user = new User();
    user.email = input.email.toLocaleLowerCase();
    user.first_name = input.first_name.toLocaleLowerCase();
    user.last_name = input.last_name.toLocaleLowerCase();
    user.description = input.description.toLocaleLowerCase();
    user.created_at = Date.now().toString()
    user.updated_at = Date.now().toString()
    await create()
    db.manager.save(user)
    return user;
  };

  static getUserByEmail = async (email: string) => {
    let user = await db.manager.findOneBy(User, {
      email: email
    })
    return user;
  };

  static getUserById = async (_id: ObjectID) => {
    let user = await db.manager.findOneBy(User, {
      _id: _id
    })
    return user;
  }

  static deleteUserById = async (_id: ObjectID) => {
    await myDataSource.getMongoRepository(User).deleteOne({
      _id: { $eq: _id },
    })
  }

  static deleteUserByEmail = async (email: string) => {
    let user = await myDataSource.getMongoRepository(User).deleteOne({
      email: { $eq: email },
    })
    return user
  }

  static updateUserById = async (_id: ObjectID, { input }: { input: UserInput }) => {
    let user = await myDataSource.getMongoRepository(User).updateOne({'_id': _id}, 
    {
      'first_name': input.first_name,
      'last_name': input.last_name,
      'email': input.email,
      'description': input.description,
      'update_at': Date.now().toString()
    })
    return user;
  }

  static getUsers = async() => {
    let users = await myDataSource.getMongoRepository(User).find();
    return users;
  }
  
}

export default UserController;