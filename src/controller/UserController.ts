import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';

interface UserInput {
  email: string
  first_name: string
  last_name: string
}

class UserController {

  // Todo: Use DTO (automapper) instead of faire tout à la mimine
  static createUser = async ({ input }: { input: UserInput }) => {
    const user = new User();
    user.email = input.email;
    user.first_name = input.first_name;
    user.last_name = input.last_name;
    await create()
    db.manager.save(user)
    return user;
  };

  static getUser = async (first_name: string) => {
    console.log(first_name)
    let user = await db.manager.findOneBy(User, {
      first_name: first_name
    })
    return user
  };

}

export default UserController;