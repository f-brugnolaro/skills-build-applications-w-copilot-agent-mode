import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectToDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

dotenv.config();

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      team: 'Octo Sprinters',
      role: 'Team Captain',
      age: 31,
      fitnessGoal: 'Improve 10K race pace',
    },
    {
      name: 'Jordan Lee',
      email: 'jordan.lee@example.com',
      team: 'Core Crushers',
      role: 'Member',
      age: 27,
      fitnessGoal: 'Build full-body strength',
    },
    {
      name: 'Priya Shah',
      email: 'priya.shah@example.com',
      team: 'Trail Mix',
      role: 'Member',
      age: 35,
      fitnessGoal: 'Train for a weekend trail race',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Octo Sprinters',
      city: 'Seattle',
      motto: 'Fast arms, faster legs',
      members: 8,
      weeklyPoints: 1240,
    },
    {
      name: 'Core Crushers',
      city: 'Austin',
      motto: 'Steady reps, strong results',
      members: 6,
      weeklyPoints: 980,
    },
    {
      name: 'Trail Mix',
      city: 'Denver',
      motto: 'Every climb counts',
      members: 7,
      weeklyPoints: 1125,
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userEmail: 'maya.chen@example.com',
      type: 'Run',
      durationMinutes: 42,
      caloriesBurned: 430,
      distanceKm: 7.2,
      activityDate: new Date('2026-06-26T13:30:00.000Z'),
    },
    {
      userEmail: 'jordan.lee@example.com',
      type: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 360,
      activityDate: new Date('2026-06-27T18:15:00.000Z'),
    },
    {
      userEmail: 'priya.shah@example.com',
      type: 'Hike',
      durationMinutes: 95,
      caloriesBurned: 640,
      distanceKm: 8.6,
      activityDate: new Date('2026-06-28T15:00:00.000Z'),
    },
  ]);

  const leaderboardEntries = await LeaderboardEntry.insertMany([
    {
      rank: 1,
      displayName: 'Maya Chen',
      userEmail: 'maya.chen@example.com',
      team: 'Octo Sprinters',
      points: 620,
    },
    {
      rank: 2,
      displayName: 'Priya Shah',
      userEmail: 'priya.shah@example.com',
      team: 'Trail Mix',
      points: 585,
    },
    {
      rank: 3,
      displayName: 'Jordan Lee',
      userEmail: 'jordan.lee@example.com',
      team: 'Core Crushers',
      points: 510,
    },
  ]);

  const workouts = await Workout.insertMany([
    {
      title: 'Tempo Builder',
      focus: 'Endurance',
      level: 'Intermediate',
      durationMinutes: 45,
      exercises: ['Dynamic warmup', '20-minute tempo run', 'Cooldown jog', 'Hip mobility'],
    },
    {
      title: 'Core Stability Circuit',
      focus: 'Strength',
      level: 'Beginner',
      durationMinutes: 30,
      exercises: ['Dead bug', 'Side plank', 'Glute bridge', 'Farmer carry'],
    },
    {
      title: 'Trail Climb Prep',
      focus: 'Power',
      level: 'Advanced',
      durationMinutes: 50,
      exercises: ['Step-ups', 'Walking lunges', 'Hill repeats', 'Calf raises'],
    },
  ]);

  console.log(`Inserted ${users.length} users`);
  console.log(`Inserted ${teams.length} teams`);
  console.log(`Inserted ${activities.length} activities`);
  console.log(`Inserted ${leaderboardEntries.length} leaderboard entries`);
  console.log(`Inserted ${workouts.length} workouts`);
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });