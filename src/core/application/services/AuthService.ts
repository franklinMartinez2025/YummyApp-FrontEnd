import { LoginUseCase } from "../use-cases/auth/LoginUseCase";
import type { IAuthGateway } from "../../domain/gateways/IAuthGateway";
import type { Response } from "../../../shared/types/api";
import type { LoginResponseDto } from "../../application/dtos/auth/login-response.dto";

export class AuthService {

  private loginUseCase: LoginUseCase;
  private authGateway: IAuthGateway;

  constructor(authGateway: IAuthGateway) {
    this.loginUseCase = new LoginUseCase();
    this.authGateway = authGateway;
  }

  /** Inicia sesión validando credenciales y llamando al gateway */
  async login(
    email: string,
    password: string
  ): Promise<Response<LoginResponseDto>> {
    const validatedData = await this.loginUseCase.execute({ email, password });
    const response = await this.authGateway.login(validatedData);
    return response;
  }

  /** Registra un nuevo usuario en el sistema */
  async register(
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string
  ): Promise<Response<boolean>> {
    return await this.authGateway.register({
      email,
      password,
      fullName,
      phoneNumber,
    });
  }

  /** Envía un correo de recuperación de contraseña */
  async forgotPassword(email: string): Promise<Response<boolean>> {
    return await this.authGateway.forgotPassword(email);
  }

  /** Restablece la contraseña usando un token y la nueva contraseña */
  async resetPassword(
    email: string,
    token: string,
    newPassword: string
  ): Promise<Response<boolean>> {
    return await this.authGateway.resetPassword(email, token, newPassword);
  }

  /** Valida si el token de recuperación es válido */
  async validateToken(token: string): Promise<Response<boolean>> {
    return await this.authGateway.validateToken(token);
  }

  /** Cierra la sesión del usuario actual */
  async logout(): Promise<void> {
    await this.authGateway.logout();
  }
}
