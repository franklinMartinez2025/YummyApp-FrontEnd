import type { IAuthGateway } from "../../domain/gateways/IAuthGateway";
import type { LoginDto } from "../../application/dtos/auth/login.dto";
import type { RegisterDto } from "../../application/dtos/auth/register.dto";
import { apiClient } from "../api/apiClient";
import type { Response } from "../../application/common/api-reponses/response";
import type { LoginResponseDto } from "../../application/dtos/auth/login-response.dto";

export class AuthAdapter implements IAuthGateway {
  async login(credentials: LoginDto): Promise<Response<LoginResponseDto>> {
    return await apiClient.post<Response<LoginResponseDto>>(
      "/Auth/login",
      credentials
    );
  }

  async register(user: RegisterDto): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>("/Auth/register", user);
  }

  async logout(): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>("/Auth/logout");
  }
}
