import {Consumer, EmployeeCreatedEvent, Topics} from '@softzone/common';
import {Employee} from "../../models/employee.model";
export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
    topic: Topics.EmployeeCreated = Topics.EmployeeCreated;

    async onMessage(data: EmployeeCreatedEvent['data']) {
        await Employee.create(data);
    }
}
