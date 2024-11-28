import {Consumer, EmployeeCreatedEvent, Topics} from '@softzone/common';
import {Employee} from "../../models/employee.model";
export class EmployeeCreatedConsumer extends Consumer<EmployeeCreatedEvent> {
    topic: Topics.EmployeeCreated = Topics.EmployeeCreated;
    async onMessage(data: EmployeeCreatedEvent['data']) {
        await Employee.create({
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
