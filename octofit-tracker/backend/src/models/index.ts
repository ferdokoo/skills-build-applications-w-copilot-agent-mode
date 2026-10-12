import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: String,
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    distance: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  },
  { timestamps: true },
)

export const User = model('User', userSchema, 'users')
export const Team = model('Team', teamSchema, 'teams')
export const Activity = model('Activity', activitySchema, 'activities')
export const Leaderboard = model('Leaderboard', leaderboardSchema, 'leaderboard')
export const Workout = model('Workout', workoutSchema, 'workouts')
