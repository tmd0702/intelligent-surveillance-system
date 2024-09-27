export interface AuthDto {
    userId: string;
    encryptedPassword?: string;
    refreshToken?: string;
    verifyToken?: string;
}