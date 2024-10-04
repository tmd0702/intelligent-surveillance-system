import { Topics, Producer, LocationCreatedEvent } from '@softzone/common';

export class LocationCreatedProducer extends Producer<LocationCreatedEvent> {
    topic: Topics.LocationCreated = Topics.LocationCreated;
}
