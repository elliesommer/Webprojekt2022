import {Booking, Entry} from "./entry";

export class EntryFactory {
  static empty(): Entry {
    return new Entry(0, '', '', 0, true,
      [{id: 0, day: new Date(), from:'', to:'', is_booked:false, entry_id:0}],
      '', '')
  }

  static formObject(rawEntry: any):Entry {
    //cast from JSON Object via REST to Entry Domain Object
    return new Entry(
      rawEntry.id,
      rawEntry.title,
      rawEntry.subject,
      rawEntry.user_id,
      rawEntry.is_offer,
      rawEntry.bookings,
      rawEntry.comment,
      rawEntry.description

    );
  }


}
