import type { UserRole } from "../../../domain/enums/user-role";

export interface LoginResponseDto {
    fullName: string;
    email: string;
    roles: UserRole;
    jwToken: string;
    refreshToken: string;
}   