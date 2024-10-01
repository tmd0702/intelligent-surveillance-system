import {Consumer, ItemUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class ItemUpdatedConsumer extends Consumer<ItemUpdatedEvent> {
    topic: Topics.ItemUpdated = Topics.ItemUpdated;

    async onMessage(data: ItemUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
