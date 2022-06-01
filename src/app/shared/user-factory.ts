import {User} from "./user";

export class UserFactory {

  static empty():User{
    return new User(0, '', '', '', '', true, '');
  }

  static fromObject(rawUser: any): User{
    return new User(
      rawUser.id,
      rawUser.firstname,
      rawUser.lastname,
      rawUser.email,
      rawUser.username,
      rawUser.is_searching,
      rawUser.description,
    );
  }
}
