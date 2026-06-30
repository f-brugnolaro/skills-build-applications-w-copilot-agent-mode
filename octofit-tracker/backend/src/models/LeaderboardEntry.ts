import { Schema, model } from 'mongoose';

export interface LeaderboardEntryDocument {
  rank: number;
  displayName: string;
  userEmail: string;
  team: string;
  points: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    rank: { type: Number, required: true },
    displayName: { type: String, required: true },
    userEmail: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true, collection: 'leaderboard' }
);

export const LeaderboardEntry = model<LeaderboardEntryDocument>(
  'LeaderboardEntry',
  leaderboardEntrySchema
);