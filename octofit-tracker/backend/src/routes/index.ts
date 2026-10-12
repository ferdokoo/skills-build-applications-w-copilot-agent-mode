import { Router } from 'express'
import type { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

async function getCollection<T>(collection: Model<T>) {
  return collection.find().lean().exec()
}

const router = Router()

router.get('/api/users/', async (_request, response) => {
  response.json(await getCollection(User))
})

router.get('/api/teams/', async (_request, response) => {
  response.json(await getCollection(Team))
})

router.get('/api/activities/', async (_request, response) => {
  response.json(await getCollection(Activity))
})

router.get('/api/leaderboard/', async (_request, response) => {
  response.json(await getCollection(Leaderboard))
})

router.get('/api/workouts/', async (_request, response) => {
  response.json(await getCollection(Workout))
})

export default router
