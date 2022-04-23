import { Message } from './message.model';

export class CreateChat {
  constructor(
    public name: string,
    public mdp: string,
    public imageUrl: string,
    public messages: Message[],
  ){}
}
