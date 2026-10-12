import mongoose from 'mongoose';
import { activity, leaderboard, team, user, workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      leaderboard.deleteMany({}),
      activity.deleteMany({}),
      team.deleteMany({}),
      user.deleteMany({}),
      workout.deleteMany({}),
    ]);

    const users = await user.insertMany([
      { username: 'maya.chen', email: 'maya.chen@example.com', firstName: 'Maya', lastName: 'Chen' },
      { username: 'leo.martinez', email: 'leo.martinez@example.com', firstName: 'Leo', lastName: 'Martinez' },
      { username: 'amina.patel', email: 'amina.patel@example.com', firstName: 'Amina', lastName: 'Patel' },
      { username: 'noah.brooks', email: 'noah.brooks@example.com', firstName: 'Noah', lastName: 'Brooks' },
      { username: 'sofia.rossi', email: 'sofia.rossi@example.com', firstName: 'Sofia', lastName: 'Rossi' },
      { username: 'ethan.williams', email: 'ethan.williams@example.com', firstName: 'Ethan', lastName: 'Williams' },
    ]);

    const teams = await team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team focused on running, hiking, and outdoor challenges.',
        members: [users[0]._id, users[1]._id, users[2]._id],
        captain: users[0]._id,
      },
      {
        name: 'Pace Makers',
        description: 'A team building consistency through strength and cardio workouts.',
        members: [users[3]._id, users[4]._id, users[5]._id],
        captain: users[3]._id,
      },
    ]);

    const now = new Date();
    const activityRecords = [
      { user: users[0], team: teams[0], activityType: 'running', duration: 35, distance: 5.2, points: 52, daysAgo: 1 },
      { user: users[0], team: teams[0], activityType: 'cycling', duration: 45, distance: 14.5, points: 45, daysAgo: 3 },
      { user: users[1], team: teams[0], activityType: 'running', duration: 28, distance: 4.1, points: 41, daysAgo: 1 },
      { user: users[1], team: teams[0], activityType: 'strength', duration: 40, points: 40, daysAgo: 2 },
      { user: users[2], team: teams[0], activityType: 'yoga', duration: 30, points: 30, daysAgo: 2 },
      { user: users[3], team: teams[1], activityType: 'cycling', duration: 50, distance: 16.2, points: 50, daysAgo: 1 },
      { user: users[3], team: teams[1], activityType: 'running', duration: 32, distance: 4.8, points: 48, daysAgo: 4 },
      { user: users[4], team: teams[1], activityType: 'strength', duration: 45, points: 45, daysAgo: 1 },
      { user: users[4], team: teams[1], activityType: 'yoga', duration: 25, points: 25, daysAgo: 3 },
      { user: users[5], team: teams[1], activityType: 'running', duration: 24, distance: 3.5, points: 35, daysAgo: 2 },
    ];

    await activity.insertMany(
      activityRecords.map(({ user, team, daysAgo, ...activity }) => ({
        ...activity,
        user: user._id,
        team: team._id,
        date: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000),
      })),
    );

    const pointsByUser = new Map<string, number>();
    for (const activity of activityRecords) {
      const userId = activity.user._id.toString();
      pointsByUser.set(userId, (pointsByUser.get(userId) ?? 0) + activity.points);
    }
    const rankedUsers = [...users].sort(
      (left, right) =>
        (pointsByUser.get(right._id.toString()) ?? 0) - (pointsByUser.get(left._id.toString()) ?? 0),
    );
    await leaderboard.insertMany(
      rankedUsers.map((user, index) => ({
        user: user._id,
        team: teams.find((team) => team.members.some((member) => member.equals(user._id)))!._id,
        points: pointsByUser.get(user._id.toString()) ?? 0,
        rank: index + 1,
      })),
    );

    await workout.insertMany([
      {
        name: 'Easy Start Run',
        description: 'A relaxed run to build an aerobic base and establish a comfortable pace.',
        activityType: 'running',
        duration: 30,
        difficulty: 'beginner',
      },
      {
        name: 'Tempo Intervals',
        description: 'Alternate brisk running intervals with easy recovery jogs.',
        activityType: 'running',
        duration: 40,
        difficulty: 'intermediate',
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced circuit of squats, push-ups, lunges, and core exercises.',
        activityType: 'strength',
        duration: 35,
        difficulty: 'intermediate',
      },
      {
        name: 'Recovery Flow',
        description: 'Gentle mobility and yoga poses to support recovery and flexibility.',
        activityType: 'yoga',
        duration: 25,
        difficulty: 'beginner',
      },
      {
        name: 'Endurance Ride',
        description: 'A steady cycling session focused on maintaining a sustainable effort.',
        activityType: 'cycling',
        duration: 50,
        difficulty: 'advanced',
      },
    ]);

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, ${activityRecords.length} activities, ${rankedUsers.length} leaderboard entries, and 5 workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
