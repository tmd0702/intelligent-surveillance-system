import { Topics, Producer, UserCreatedEvent } from '@softzone/common';

export class UserCreatedProducer extends Producer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;
}
