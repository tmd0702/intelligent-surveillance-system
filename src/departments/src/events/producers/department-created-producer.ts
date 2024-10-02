import { Topics, Producer, DepartmentCreatedEvent } from '@softzone/common';

export class DepartmentCreatedProducer extends Producer<DepartmentCreatedEvent> {
    topic: Topics.DepartmentCreated = Topics.DepartmentCreated;
}
