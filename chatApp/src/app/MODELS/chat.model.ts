import { Message } from './message.model';
import { Troles } from './roles.model';

export class Chat {
  constructor(
    public _id: string,
    public name: string,
    public mdp: string,
    public image: string,
    public messages: Message[],
    public roles: Partial<Troles>
  ){}
}
