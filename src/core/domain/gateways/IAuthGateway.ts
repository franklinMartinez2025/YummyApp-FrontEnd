import type { LoginResponseDto } from "../../application/dtos/auth/login-response.dto";
import type { LoginDto } from "../../application/dtos/auth/login.dto";
import type { RegisterDto } from "../../application/dtos/auth/register.dto";
import type { Response } from "../../../shared/types/api";

export interface IAuthGateway {
  /** Iniciar sesión */
  login(credentials: LoginDto): Promise<Response<LoginResponseDto>>;

  /** Registra un nuevo usuario */
  register(user: RegisterDto): Promise<Response<boolean>>;

  /** Cierra sesión */
  logout(): Promise<Response<boolean>>;
}
