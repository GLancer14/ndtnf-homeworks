export interface User {
  username: string;
  password: string;
}

export abstract class UsersRepository {
  createUser(user: User): void {};
  findUserById(id: string): Promise<User | null> {
    return null;
  };
  findUserByName(username: string): Promise<User | null> {
    return null;
  };
}