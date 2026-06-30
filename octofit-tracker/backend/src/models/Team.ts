import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  city: string;
  motto: string;
  members: number;
  weeklyPoints: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    motto: { type: String, required: true },
    members: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Team = model<TeamDocument>('Team', teamSchema);