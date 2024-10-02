import {Consumer, DepartmentUpdatedEvent, Topics} from '@softzone/common';
import {Department} from "../../models/department.model";
export class DepartmentUpdatedConsumer extends Consumer<DepartmentUpdatedEvent> {
    topic: Topics.DepartmentUpdated = Topics.DepartmentUpdated;

    async onMessage(data: DepartmentUpdatedEvent['data']) {
        await Department.updateByID(data.id, data);
    }
}
