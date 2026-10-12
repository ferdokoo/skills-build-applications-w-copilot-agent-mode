import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

function fetchLeaderboard(signal) {
  return fetch('/api/leaderboard/', { signal })
}

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="Celebrate the people and teams turning effort into points."
      load={fetchLeaderboard}
      columns={[
        { label: 'Rank', render: (entry) => `#${entry.rank ?? '—'}` },
        { label: 'User', key: 'user' },
        { label: 'Team', key: 'team' },
        { label: 'Points', key: 'points' },
      ]}
    />
  )
}

export default Leaderboard
