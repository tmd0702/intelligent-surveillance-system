export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    citizenId?: string;
    token?: string;
    status: string;
}