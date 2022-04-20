import { Message } from "./message.model";

export class Chat {
  constructor(
    public _id: string,
    public name: string,
    public imageUrl:string,
    public messages: Message[],
  ){}
}
