import {Consumer, StoreCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";
export class StoreCreatedConsumer extends Consumer<StoreCreatedEvent> {
    topic: Topics.StoreCreated = Topics.StoreCreated;

    async onMessage(data: StoreCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
