import {Consumer, DepartmentCreatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class DepartmentCreatedConsumer extends Consumer<DepartmentCreatedEvent> {
    topic: Topics.DepartmentCreated = Topics.DepartmentCreated;

    async onMessage(data: DepartmentCreatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
