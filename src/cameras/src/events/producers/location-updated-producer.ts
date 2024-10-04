import { Topics, Producer, LocationUpdatedEvent } from '@softzone/common';

export class LocationUpdatedProducer extends Producer<LocationUpdatedEvent> {
    topic: Topics.LocationUpdated = Topics.LocationUpdated;
}
