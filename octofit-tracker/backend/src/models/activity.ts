import { model, Schema } from 'mongoose'

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

export const activity = model('Activity', activitySchema, 'activities')
