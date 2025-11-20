import type { UserDto, CreateUserDto, UpdateUserDto } from '../../application/dtos/user/UserDto';

export interface IUserGateway {

  getUserById(id: string): Promise<UserDto | null>;

  getUserByEmail(email: string): Promise<UserDto | null>;

  createUser(user: CreateUserDto): Promise<UserDto>;

  updateUser(id: string, user: UpdateUserDto): Promise<UserDto>;

  deleteUser(id: string): Promise<void>;

  forgotPassword(email: string): Promise<void>;
  
  resetPassword(token: string, newPassword: string): Promise<void>;
}

