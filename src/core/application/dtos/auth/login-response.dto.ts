export interface LoginResponseDto {
    userId: string;
    fullName: string;
    email: string;
    roles: string[];
    jwToken: string;
    refreshToken: string;
}   