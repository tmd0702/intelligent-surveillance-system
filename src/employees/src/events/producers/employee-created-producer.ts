import { Topics, Producer, EmployeeCreatedEvent } from '@softzone/common';

export class EmployeeCreatedProducer extends Producer<EmployeeCreatedEvent> {
    topic: Topics.EmployeeCreated = Topics.EmployeeCreated;
}
