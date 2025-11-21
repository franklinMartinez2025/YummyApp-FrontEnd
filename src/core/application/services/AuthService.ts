import { LoginUseCase } from "../use-cases/auth/LoginUseCase";
import type { IAuthGateway } from "../../domain/gateways/IAuthGateway";
import type { Response } from "../common/api-reponses/response";
import type { LoginResponseDto } from "../../application/dtos/auth/login-response.dto";

export class AuthService {
  private loginUseCase: LoginUseCase;
  private authGateway: IAuthGateway;

  constructor(authGateway: IAuthGateway) {
    this.loginUseCase = new LoginUseCase();
    this.authGateway = authGateway;
  }

  async login(
    email: string,
    password: string
  ): Promise<Response<LoginResponseDto>> {
    const validatedData = await this.loginUseCase.execute({ email, password });
    const response = await this.authGateway.login(validatedData);
    return response;
  }

  async register(
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    role: string
  ): Promise<Response<boolean>> {
    return await this.authGateway.register({
      email,
      password,
      fullName,
      phoneNumber,
      roleName: role,
    });
  }

  async logout(): Promise<void> {
    await this.authGateway.logout();
  }
}
