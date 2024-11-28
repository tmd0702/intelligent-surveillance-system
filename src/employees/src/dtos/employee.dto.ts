export interface EmployeeDto {
    id: string;
    employee_code: string;
    first_name: string;
    last_name: string;
    gender: 'male' | 'female' | 'other',
    phone_number: string;
    email: string;
    position: string;
    department_id: string;
    dob: string;
    address: string;
    face_id: string;
}