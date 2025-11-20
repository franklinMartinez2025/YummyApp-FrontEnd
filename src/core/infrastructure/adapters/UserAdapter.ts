import type { IUserGateway } from '../../domain/gateways/IUserGateway';
import type { UserDto, CreateUserDto, UpdateUserDto } from '../../application/dtos/user/UserDto';
import { apiClient } from '../api/apiClient';

export class UserAdapter implements IUserGateway {
  async getUserById(id: string): Promise<UserDto | null> {
    try {
      return await apiClient.get<UserDto>(`/users/${id}`);
    } catch (error) {
      console.error('Error fetching user by id:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    try {
      return await apiClient.get<UserDto>(`/users/email/${email}`);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    return await apiClient.post<UserDto>('/users', user);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<UserDto> {
    return await apiClient.put<UserDto>(`/users/${id}`, user);
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/users/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/users/reset-password', { token, newPassword });
  }
}

