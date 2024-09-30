import {Consumer, UserCreatedEvent, Topics} from '@softzone/common';
import {Wallet} from "../../models/wallet.model";

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;

    async onMessage(data: UserCreatedEvent['data']) {
        await Wallet.create({user_id: data.id});
    }
}
