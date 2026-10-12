import CollectionPage from './CollectionPage.jsx'
import { fetchCollection as fetch } from '../api.js'

function fetchUsers(signal) {
  return fetch('/api/users/', { signal })
}

function Users() {
  return (
    <CollectionPage
      title="Users"
      description="Meet the community behind every workout and personal best."
      load={fetchUsers}
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
