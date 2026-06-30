import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  activityDate: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userEmail: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);