export class Message {
  constructor(
    public _id: string,
    public message: string,
    public chat_id: string,
    public from: string,
  ){}
}
