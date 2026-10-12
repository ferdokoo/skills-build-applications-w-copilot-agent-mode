import { model, Schema } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

export const team = model('Team', teamSchema, 'teams')
