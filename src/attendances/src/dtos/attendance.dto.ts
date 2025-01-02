export interface AttendanceDto {
    id: string;
    employee_id: string;
    check_in: string;
    check_out: string;
    status: string;
    byte_data?: Buffer;
}