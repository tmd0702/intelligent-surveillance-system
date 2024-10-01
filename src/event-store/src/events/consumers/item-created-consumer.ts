import {Consumer, ItemCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class ItemCreatedConsumer extends Consumer<ItemCreatedEvent> {
    topic: Topics.ItemCreated = Topics.ItemCreated;

    async onMessage(data: ItemCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
