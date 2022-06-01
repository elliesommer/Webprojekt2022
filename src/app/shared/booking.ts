import {Entry} from "./entry";
export {Entry} from "./entry";


export class Booking {
  constructor(
    public id: number,
    public day: Date,
    public from: string,
    public to: string,
    public is_booked: Boolean,
    public entry_id: number)
  {}
}
