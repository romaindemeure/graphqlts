import { v4 as uuidv4 } from 'uuid';
import db from '../config/config';
import { User } from '../entity/User';

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
  async create(u: User) {
    await db.manager.save(u);
  }
}

export default UserController;