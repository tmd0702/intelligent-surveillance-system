export interface UserDto {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    dob?: string;
    face_id?: string;
    citizen_id?: string;
    token?: string;
    status: string;
}