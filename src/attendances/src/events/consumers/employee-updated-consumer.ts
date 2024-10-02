import {Consumer, EmployeeUpdatedEvent, Topics} from '@softzone/common';
import {Employee} from "../../models/employee.model";
export class EmployeeUpdatedConsumer extends Consumer<EmployeeUpdatedEvent> {
    topic: Topics.EmployeeUpdated = Topics.EmployeeUpdated;

    async onMessage(data: EmployeeUpdatedEvent['data']) {
        await Employee.updateByID(data.id, data);
    }
}
