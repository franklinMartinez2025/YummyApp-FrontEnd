export interface LoginResponseDto {
    fullName: string;
    email: string;
    roles: string[];
    jwToken: string;
    refreshToken: string;
}   