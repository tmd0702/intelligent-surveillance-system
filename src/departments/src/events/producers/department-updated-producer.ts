import { Topics, Producer, DepartmentUpdatedEvent } from '@softzone/common';

export class DepartmentUpdatedProducer extends Producer<DepartmentUpdatedEvent> {
    topic: Topics.DepartmentUpdated = Topics.DepartmentUpdated;
}
