export class CreateMessage {
  constructor(
    public message: string,
    public chat_id: string,
    public from: string,
    public time: string,
  ){}
}
