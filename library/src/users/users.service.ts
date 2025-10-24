import { type User, UsersRepository } from "./user.js";
import Users from "./users.model.js";

export class UsersService implements UsersRepository {
  async createUser(user: User): Promise<void> {
    const newUser = new Users(user);
    await newUser.save();
  }

  async findUserById(id: string): Promise<User | null> {
    return await Users.findById(id);
  }

  async findUserByName(username: string): Promise<User | null> {
    return await Users.findOne({ username });
  }
}