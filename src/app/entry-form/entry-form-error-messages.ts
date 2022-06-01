export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const EntryFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Der Titel für den Eintrag muss angegeben werden'),
  new ErrorMessage('subject', 'required', 'Die Lehrveranstaltung muss angegeben werden'),
  new ErrorMessage('day', 'required', 'Das Datum muss angegeben werden'),
  new ErrorMessage('from', 'required', 'Die Startzeit muss angegeben werden'),
  new ErrorMessage('to', 'required', 'Die Endzeit muss angegeben werden')
];
