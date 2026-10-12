import CollectionPage from './CollectionPage.jsx'

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="Celebrate the people and teams turning effort into points."
      endpoint="/api/leaderboard/"
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
