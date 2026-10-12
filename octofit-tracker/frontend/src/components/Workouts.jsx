import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

function fetchWorkouts(signal) {
  return fetch('/api/workouts/', { signal })
}

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Choose a workout that fits your goals and your pace."
      load={fetchWorkouts}
      columns={[
        { label: 'Workout', key: 'name' },
        { label: 'Activity', key: 'activityType' },
        { label: 'Duration', render: (workout) => `${workout.duration ?? '—'} min` },
        { label: 'Difficulty', key: 'difficulty' },
        { label: 'Description', key: 'description' },
      ]}
    />
  )
}

export default Workouts
