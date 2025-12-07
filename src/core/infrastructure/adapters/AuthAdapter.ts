import type { IAuthGateway } from "../../domain/gateways/IAuthGateway";
import type { LoginDto } from "../../application/dtos/auth/login.dto";
import type { RegisterDto } from "../../application/dtos/auth/register.dto";
import { apiClient } from "../api/apiClient";
import type { Response } from "../../../shared/types/api";
import type { LoginResponseDto } from "../../application/dtos/auth/login-response.dto";
import { API_SERVICES } from "../../config/api.config";

export class AuthAdapter implements IAuthGateway {  

  /** Realiza la petición de login al backend */
  async login(credentials: LoginDto): Promise<Response<LoginResponseDto>> {
    return await apiClient.post<Response<LoginResponseDto>>(`${API_SERVICES.USERS}/Auth/login`, credentials);
  }

  /** Realiza la petición de registro al backend */
  async register(user: RegisterDto): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.USERS}/Auth/register`, user);
  } 

  /** Realiza la petición de forgot password al backend */
  async forgotPassword(email: string): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.USERS}/Auth/forgot-password`, { email });
  }

  /** Realiza la petición de reset password al backend */
  async resetPassword(email: string, token: string, newPassword: string): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.USERS}/Auth/reset-password`, { email, token, newPassword });
  }

  /** Realiza la petición de validate token al backend */
  async validateToken(token: string): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.USERS}/Auth/validate-token`, { token: token });
  }

    /** Realiza la petición de logout al backend */
  async logout(): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.USERS}/Auth/logout`);
  }
}
