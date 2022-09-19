import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';

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

}

export default UserController;