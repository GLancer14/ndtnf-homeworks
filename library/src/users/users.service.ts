import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDocument, User as UserSchema } from 'src/schemas/user.schema';
import { UserSignupDto } from './types/dto/user-dto.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  findOne(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  findById(id: string): Promise<UserDocument | null> {
    return this.UserModel.findById(id).exec();
  }

  async createUser(userData: UserSignupDto): Promise<UserDocument> {
    const newUser = new this.UserModel(userData);
    const newSavedUser = await newUser.save();
    return newSavedUser;
  }
}
