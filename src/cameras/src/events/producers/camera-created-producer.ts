import { Topics, Producer, CameraCreatedEvent } from '@softzone/common';

export class CameraCreatedProducer extends Producer<CameraCreatedEvent> {
    topic: Topics.CameraCreated = Topics.CameraCreated;
}
