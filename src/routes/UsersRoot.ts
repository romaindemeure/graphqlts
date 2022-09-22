import { ObjectID } from "typeorm";
import UserController from "../controller/UserController";

const root = {

  createUser: async (obj) => {
    let value = UserController.createUser(obj);
    return value
  },

  getUserByEmail: async (obj) => { // obj.id => ID de l'user
    let value = UserController.getUserByEmail(obj.email); 
    return value
  },

  getUserById: async (obj) => { // obj.id => ID de l'user
    let value = UserController.getUserById(obj.id); 
    return value
  },

  deleteUserById: async(obj) => {
    let value = UserController.deleteUserById(obj.id);
    return value
  },
  
  deleteUserByEmail: async(obj) => {
    let value = UserController.deleteUserByEmail(obj.email);
    return value
  },

  updateUserByEmail: async (obj) => {
    let value = UserController.updateUserByEmail(obj.email, obj.input);
    return value
  },

  updateUserById: async (obj) => {
    let value = UserController.updateUserById(obj.id, obj.input);
    return value
  },

  getUsers: async () => {
    let value = UserController.getUsers()
    return value
  }

};

export default root;