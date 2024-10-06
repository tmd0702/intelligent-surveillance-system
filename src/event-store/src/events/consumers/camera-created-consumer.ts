import {Consumer, CameraCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class CameraCreatedConsumer extends Consumer<CameraCreatedEvent> {
    topic: Topics.CameraCreated = Topics.CameraCreated;

    async onMessage(data: CameraCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
