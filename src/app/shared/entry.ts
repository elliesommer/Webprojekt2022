import { Booking } from "./booking";
export { Booking } from "./booking";
import { User } from "./user";
export { User } from "./user";

export class Entry {
  constructor(
    public id: number,
    public title: string,
    public subject: string,
    public user_id: number,
    public is_offer: boolean,
    public bookings?: Booking[],
    public comment?: string,
    public description?: string
  ) { }
}
