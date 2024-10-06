import {Consumer, LocationCreatedEvent, Topics} from '@softzone/common';
import {Location} from "../../models/location.model";
export class LocationCreatedConsumer extends Consumer<LocationCreatedEvent> {
    topic: Topics.LocationCreated = Topics.LocationCreated;

    async onMessage(data: LocationCreatedEvent['data']) {
        await Location.create(data);
    }
}
