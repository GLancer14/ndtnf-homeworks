export interface User {
  username: string;
  password: string;
}

export abstract class UsersRepository {
  abstract createUser(user: User): void;
  abstract findUserById(id: string): Promise<User | null>;
  abstract findUserByName(username: string): Promise<User | null>;
}

export interface UserSerializationCB {
  (err: Error, id?: unknown): void;
};