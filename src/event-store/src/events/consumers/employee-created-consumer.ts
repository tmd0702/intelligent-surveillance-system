import {Consumer, EmployeeCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
    topic: Topics.EmployeeCreated = Topics.EmployeeCreated;

    async onMessage(data: EmployeeCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
