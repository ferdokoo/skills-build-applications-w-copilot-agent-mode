import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

function fetchActivities(signal) {
  return fetch('/api/activities/', { signal })
}

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="A log of the movement and milestones your community has recorded."
      load={fetchActivities}
      columns={[
        { label: 'Activity', key: 'activityType' },
        { label: 'User', key: 'user' },
        { label: 'Team', key: 'team' },
        { label: 'Duration', render: (activity) => `${activity.duration ?? '—'} min` },
        { label: 'Distance', render: (activity) => activity.distance == null ? '—' : `${activity.distance} km` },
        { label: 'Points', key: 'points' },
        {
          label: 'Date',
          render: (activity) =>
            activity.date ? new Date(activity.date).toLocaleDateString() : '—',
        },
      ]}
    />
  )
}

export default Activities
