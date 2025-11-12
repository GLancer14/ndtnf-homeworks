import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument, User as UserSchema } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  findOne(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  createUser(userData: User) {
    const newUser = new this.UserModel(userData);
    newUser.save();
  }
}
