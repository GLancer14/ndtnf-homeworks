export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type UserJwtPayload = UserDataForJwtPayload & {
  iat: number;
  exp: number;
}

export interface UserDataForJwtPayload {
  id: string;
  email: string;
  firstName: string;
}