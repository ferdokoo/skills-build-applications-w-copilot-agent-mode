import { model, Schema } from 'mongoose'

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

export const workout = model('Workout', workoutSchema, 'workouts')
