import { Message } from './message.model';

export class Chat {
  constructor(
    public _id: string,
    public name: string,
    public mdp: string,
    public image: string,
    public messages: Message[],
  ){}
}
