import {Consumer, LocationUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";
export class LocationUpdatedConsumer extends Consumer<LocationUpdatedEvent> {
    topic: Topics.LocationUpdated = Topics.LocationUpdated;

    async onMessage(data: LocationUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
