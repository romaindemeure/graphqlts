import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';
import myDataSource from '../config/config';
import { ObjectID } from 'mongodb';

interface UserInput {
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

  static getUserById = async (id: ObjectID) => {
    let testID = new ObjectID(id);
    let user = await db.manager.findOneBy(User, testID);
    return user;
  };

  static deleteUserById = async (id: ObjectID) => {
    let testID = new ObjectID(id);
    let user = await db.manager.delete(User, testID);
  };

  static deleteUserByEmail = async (email: string) => {
    let user = await myDataSource.getMongoRepository(User).deleteOne({
      email: { $eq: email },
    })
    return user;
  };

  static updateUserByEmail = async (email: string, input) => {
    console.log(input);
    input.updated_at = Date.now().toString()

    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        input[key] = input[key].toLocaleLowerCase();
      }
    }
    let user = await myDataSource.getMongoRepository(User).update({
        "email": email
    }, input);
    
    return UserController.getUserByEmail(email);
    // return user;
  };

  static getUsers = async () => {
    let users = await myDataSource.getMongoRepository(User).find();
    return users;
  };
  
};

export default UserController;