export const UserRole = {
  Client: 1,
  Courier: 2,
  RestaurantOwner: 3,
  Admin: 99,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];