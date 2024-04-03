import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
}