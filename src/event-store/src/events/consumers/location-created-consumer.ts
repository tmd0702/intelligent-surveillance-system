import {Consumer, LocationCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class LocationCreatedConsumer extends Consumer<LocationCreatedEvent> {
    topic: Topics.LocationCreated = Topics.LocationCreated;

    async onMessage(data: LocationCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
