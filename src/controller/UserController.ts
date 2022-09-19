import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';
import myDataSource from '../config/config';

interface UserInput {
  _id: string
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
    user._id = uuidv4();
    user.email = input.email;
    user.first_name = input.first_name;
    user.last_name = input.last_name;
    user.description = input.description;
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
    return user
  };

  static getUserById = async (_id: string) => {
    let user = await db.manager.findOneBy(User, {
      _id: _id
    })
    return user
  }

  static deleteUserById = async (_id: string) => {
    await myDataSource.getMongoRepository(User).deleteOne({
      _id: { $eq: _id },
    })
  }

  static deleteUserByEmail = async (email: string) => {
    await myDataSource.getMongoRepository(User).deleteOne({
      email: { $eq: email },
    })
  }

  static updateUserById = async (_id: string, { input }: { input: UserInput }) => {
    await myDataSource.getMongoRepository(User).updateMany({'_id': _id}, 
    {
      'first_name': input.first_name,
      'last_name': input.last_name,
      'email': input.email,
      'description': input.description,
      'update_at': Date.now().toString()
    })

  }
  
}

export default UserController;