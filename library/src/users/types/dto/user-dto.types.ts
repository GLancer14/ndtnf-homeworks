export interface UserSignupDto {
  email: string;
  password: string;
  firstName: string;
  lastName: boolean;
}

export interface UserSigninDto {
  email: string;
  password: string;
}
