import { Router } from 'express'
import type { Model } from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

function createCollectionRouter<T>(collection: Model<T>): Router {
  const router = Router()

  router.get('/', async (_request, response) => {
    const documents = await collection.find().lean().exec()
    response.json(documents)
  })

  return router
}

const apiRouter = Router()

apiRouter.use('/users', createCollectionRouter(User))
apiRouter.use('/teams', createCollectionRouter(Team))
apiRouter.use('/activities', createCollectionRouter(Activity))
apiRouter.use('/leaderboard', createCollectionRouter(Leaderboard))
apiRouter.use('/workouts', createCollectionRouter(Workout))

export default apiRouter
