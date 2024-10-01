import {Consumer, UserCreatedEvent, Topics, UserUpdatedEvent} from '@softzone/common';
import EventModel from "../../models/event.model";

export class UserUpdatedConsumer extends Consumer<UserUpdatedEvent> {
    topic: Topics.UserUpdated = Topics.UserUpdated;

    async onMessage(data: UserCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
