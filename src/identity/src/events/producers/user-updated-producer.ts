import { Topics, Producer, UserUpdatedEvent } from '@softzone/common';

export class UserUpdatedProducer extends Producer<UserUpdatedEvent> {
    topic: Topics.UserUpdated = Topics.UserUpdated;
}
