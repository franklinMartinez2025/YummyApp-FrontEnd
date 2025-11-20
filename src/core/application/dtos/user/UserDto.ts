export interface UserDto {
  id: string;
  email: string;
  name: string;
  phone: string;
  address?: AddressDto;
  createdAt: string;
}

export interface AddressDto {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CreateUserDto {
  email: string;
  name: string;
  phone: string;
  password: string;
  address?: Omit<AddressDto, 'id'>;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  address?: Omit<AddressDto, 'id'>;
}

