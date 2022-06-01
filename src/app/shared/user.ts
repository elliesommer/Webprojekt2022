import {Entry, Booking} from '../shared/entry';

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public username: string,
    //public password: string,
    public is_searching: Boolean,
    public description?: string
  )
  { }
}
