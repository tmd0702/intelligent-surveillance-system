import {Consumer, LocationUpdatedEvent, Topics} from '@softzone/common';
import {Location} from "../../models/location.model";
export class LocationUpdatedConsumer extends Consumer<LocationUpdatedEvent> {
    topic: Topics.LocationUpdated = Topics.LocationUpdated;

    async onMessage(data: LocationUpdatedEvent['data']) {
        await Location.updateByID(data.id, data);
    }
}
