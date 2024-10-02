import { Topics, Producer, EmployeeUpdatedEvent } from '@softzone/common';

export class EmployeeUpdatedProducer extends Producer<EmployeeUpdatedEvent> {
    topic: Topics.EmployeeUpdated = Topics.EmployeeUpdated;
}
