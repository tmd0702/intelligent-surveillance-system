import { Topics, Consumer, UserCreatedEvent } from '@softzone/common';

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;

    async onMessage(data: UserCreatedEvent['data']) {
        const { id, status } = data;
        console.log(data);
    }
}
