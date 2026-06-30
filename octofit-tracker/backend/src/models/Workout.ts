import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  focus: string;
  level: string;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    focus: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);