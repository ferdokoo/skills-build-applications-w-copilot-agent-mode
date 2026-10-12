import CollectionPage from './CollectionPage.jsx'

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Choose a workout that fits your goals and your pace."
      endpoint="/api/workouts/"
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
