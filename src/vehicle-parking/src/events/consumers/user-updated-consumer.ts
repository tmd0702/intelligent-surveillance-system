import {Consumer, UserUpdatedEvent, Topics} from '@softzone/common';
import {User} from "../../models/user.model";
export class UserUpdatedConsumer extends Consumer<UserUpdatedEvent> {
    topic: Topics.UserUpdated = Topics.UserUpdated;

    async onMessage(data: UserUpdatedEvent['data']) {
        await User.updateByID(data.id, data);
    }
}
