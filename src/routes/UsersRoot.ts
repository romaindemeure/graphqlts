import UserController from "../controller/UserController";

const root = {
  // getUser: ({ id }: { id: string }) => {
  //   if (!fakeDatabase[id]) {
  //     throw new Error('no User exists with id ' + id);
  //   }
  //   const userRes = new UserController(id, fakeDatabase[id]);
  //   return userRes;
  // },
  // getUsers: () => {
  //   let Users = [];
  //   for (const key in fakeDatabase) {
  //     fakeDatabase[key].id = key;
  //     Users.push(fakeDatabase[key])
  //   }
  //   return Users;
  // },
  // createUserr: async ({ input }: { input: UserInput }) => {
  //   const user = new User();
  //   user.email = input.email;
  //   user.first_name = input.first_name;
  //   user.last_name = input.last_name;
  //   await controller.create(user).catch(console.log);
  //   return user;
  // },
  createUser: async (obj) => {
    let value = UserController.createUser(obj);
    return value
  },
  getUser: async (obj) => { // obj.id => ID de l'user
    let value = UserController.getUser(obj.first_name); 
    return value
  }
  // updateUser: ({ id, input }: { id: string, input: any }) => {
  //   if (!fakeDatabase[id]) {
  //     throw new Error('no User exists with id ' + id);
  //   }
  //   // This replaces all old data, but some apps might want partial update.
  //   fakeDatabase[id] = input;
  //   return new UserController(id, input);
  // },
};

export default root;