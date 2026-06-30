import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  team: string;
  role: string;
  age: number;
  fitnessGoal: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    role: { type: String, required: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<UserDocument>('User', userSchema);