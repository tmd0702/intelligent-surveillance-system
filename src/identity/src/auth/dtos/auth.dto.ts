export interface AuthDto {
    user_id: string;
    encrypted_password?: string;
    refresh_token?: string;
    verify_token?: string;
    otp?: string;
}