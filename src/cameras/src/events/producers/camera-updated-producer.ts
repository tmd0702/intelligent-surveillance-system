import { Topics, Producer, CameraUpdatedEvent } from '@softzone/common';

export class CameraUpdatedProducer extends Producer<CameraUpdatedEvent> {
    topic: Topics.CameraUpdated = Topics.CameraUpdated;
}
