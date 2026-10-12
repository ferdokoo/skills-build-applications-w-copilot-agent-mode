import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

function fetchTeams(signal) {
  return fetch('/api/teams/', { signal })
}

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find the crews building healthy habits together."
      load={fetchTeams}
      columns={[
        { label: 'Team', key: 'name' },
        { label: 'Description', key: 'description' },
        { label: 'Members', render: (team) => team.members?.length ?? 0 },
        { label: 'Captain', key: 'captain' },
      ]}
    />
  )
}

export default Teams
