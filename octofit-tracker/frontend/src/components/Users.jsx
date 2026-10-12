import CollectionPage from './CollectionPage.jsx'

function Users() {
  return (
    <CollectionPage
      title="Users"
      description="Meet the community behind every workout and personal best."
      endpoint="/api/users/"
      columns={[
        {
          label: 'Name',
          render: (user) =>
            [user.firstName, user.lastName].filter(Boolean).join(' ') ||
            user.username ||
            '—',
        },
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
      ]}
    />
  )
}

export default Users
