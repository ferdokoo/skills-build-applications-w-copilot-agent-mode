import CollectionPage from './CollectionPage.jsx'

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find the crews building healthy habits together."
      endpoint="/api/teams/"
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
