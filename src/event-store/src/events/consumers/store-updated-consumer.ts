import {Consumer, StoreUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";
export class StoreUpdatedConsumer extends Consumer<StoreUpdatedEvent> {
    topic: Topics.StoreUpdated = Topics.StoreUpdated;

    async onMessage(data: StoreUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
