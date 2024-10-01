import {Consumer, UserCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class UserCreatedConsumer extends Consumer<UserCreatedEvent> {
    topic: Topics.UserCreated = Topics.UserCreated;

    async onMessage(data: UserCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
