import { Message } from "./message.model";

export class CreateChat {
  constructor(
    public name: string,
    public imageUrl:string,
    public messages: Message[],
  ){}
}
