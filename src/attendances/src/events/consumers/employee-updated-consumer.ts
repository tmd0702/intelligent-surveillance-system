import {Consumer, EmployeeUpdatedEvent, Topics} from '@softzone/common';
import {Employee} from "../../models/employee.model";
export class EmployeeUpdatedConsumer extends Consumer<EmployeeUpdatedEvent> {
    topic: Topics.EmployeeUpdated = Topics.EmployeeUpdated;

    async onMessage(data: EmployeeUpdatedEvent['data']) {
        await Employee.updateByID(data.id, {
            id: data.id,
            employee_code: data.employee_code,
            first_name: data.first_name,
            last_name: data.last_name,
            position: data.position,
            phone_number: data.phone_number,
            department_id: data.department_id,
            email: data.email,
            address: data.address,
            face_id: data.face_id
        });
    }
}
