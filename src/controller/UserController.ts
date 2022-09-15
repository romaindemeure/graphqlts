import { create } from 'domain';
import db from '../config/config';
import { User } from '../entity/User';

interface UserInput {
  id: number
  email: string
  first_name: string
  last_name: string
}

class UserController {
  // id: string
  // first_name: string
  // last_name: string
  // email: string
  // constructor(id: string, {first_name, last_name, email}: {first_name: any, last_name: any, email: any}) {
  //   this.id = id;
  //   this.first_name = first_name;
  //   this.last_name = last_name;
  //   this.email = email;
  // }

  // static id = async (id) => {
  //   return id = uuidv4();
  // }

  // static first_name = async (first_name) => {
  //   return first_name.toLocaleLowerCase()
  // }

  // static last_name = async (last_name) => {
  //   return last_name.toLocaleLowerCase()
  // }
  
  // async create(u: User) {
  //   await db.manager.save(u);
  // }

  static createUser({ input }: { input: UserInput }) {
    const user = new User();
    user.email = input.email;
    user.first_name = input.first_name;
    user.last_name = input.last_name;
    create()
    db.manager.save(user)
    return user;
  }
}

export default UserController;