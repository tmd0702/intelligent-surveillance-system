import {Consumer, UserCreatedEvent, Topics} from '@softzone/common';
import {User} from "../../models/user.model";

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;

    async onMessage(data: UserCreatedEvent['data']) {
        await User.create(data);
    }
}
