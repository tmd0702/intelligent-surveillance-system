export interface EmployeeDto {
    id: string;
    employee_code: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    position: string;
    address: string;
    department_id?: string;
    face_id: string;
}