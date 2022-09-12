// If User had any complex fields, we'd put them on this object.
class User {
    id: string
    first_name: string
    last_name: string
    email: string
    constructor(id: string, {first_name, last_name, email}: {first_name: any, last_name: any, email: any}) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
    }
  }