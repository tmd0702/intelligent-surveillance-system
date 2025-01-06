export interface AttendanceDto {
    id?: string;
    employee_id: string;
    created_at?: string;
    confidence_score?: number;
    status: string;
    byte_data?: Buffer;
}