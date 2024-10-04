import {Consumer, UserCreatedEvent, Topics} from '@softzone/common';
import {Customer} from "../../models/customer.model";
export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;

    async onMessage(data: UserCreatedEvent['data']) {
        await Customer.create({id: data.id, is_registed: true});
    }
}
