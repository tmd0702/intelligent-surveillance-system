import {Consumer, DepartmentCreatedEvent, Topics} from '@softzone/common';
import {Department} from "../../models/department.model";
export class DepartmentCreatedConsumer extends Consumer<DepartmentCreatedEvent> {
    topic: Topics.DepartmentCreated = Topics.DepartmentCreated;

    async onMessage(data: DepartmentCreatedEvent['data']) {
        await Department.create(data);
    }
}
