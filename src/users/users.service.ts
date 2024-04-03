import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(firstName: string, lastName: string, email: string): Promise<User> {
    const newUser = new this.userModel({ firstName, lastName, email });
    return newUser.save();
  }
}