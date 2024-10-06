import {Consumer, DepartmentUpdatedEvent, Topics} from '@softzone/common';
import EventModel from "../../models/event.model";

export class DepartmentUpdatedConsumer extends Consumer<DepartmentUpdatedEvent> {
    topic: Topics.DepartmentUpdated = Topics.DepartmentUpdated;

    async onMessage(data: DepartmentUpdatedEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
