import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';

interface UserInput {
  email: string
  first_name: string
  last_name: string
}

class UserController {

  static createUser = async ({ input }: { input: UserInput }) => {
    const user = new User();
    user.email = input.email;
    user.first_name = input.first_name;
    user.last_name = input.last_name;
    await create()
    db.manager.save(user)
    return user;
  };

  static getUser = async (first_name) => {
    console.log(first_name)
    const user = await db.manager.findOneBy(User, {
      first_name: first_name,
    })
    console.log(user)
    return user
  };
  
}

export default UserController;