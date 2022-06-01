import {Booking} from "./booking";

export class BookingFactory {
  static empty(): Booking{
    return new Booking(0, new Date(), '', '', false, 0);
  }

  static fromObject(rawBooking: any): Booking{
    return new Booking(
      rawBooking.id,
      rawBooking.day,
      rawBooking.from,
      rawBooking.to,
      rawBooking.is_booked,
      rawBooking.entry_id
    );
  }
}
