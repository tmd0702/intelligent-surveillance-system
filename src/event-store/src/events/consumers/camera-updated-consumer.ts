import {Consumer, CameraUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class CameraUpdatedConsumer extends Consumer<CameraUpdatedEvent> {
    topic: Topics.CameraUpdated = Topics.CameraUpdated;

    async onMessage(data: CameraUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
