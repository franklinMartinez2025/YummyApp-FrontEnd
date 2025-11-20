import type { LoginDto } from "../../../application/dtos/auth/login.dto";

export class LoginUseCase {
  async execute(loginData: LoginDto): Promise<LoginDto> {

    if (!loginData.email || !loginData.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      throw new Error('El formato del email no es válido');
    }

    if (loginData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    return loginData;
  }
}

