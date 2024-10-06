import {Consumer, EmployeeUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class EmployeeUpdatedConsumer extends Consumer<EmployeeUpdatedEvent> {
    topic: Topics.EmployeeUpdated = Topics.EmployeeUpdated;

    async onMessage(data: EmployeeUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
