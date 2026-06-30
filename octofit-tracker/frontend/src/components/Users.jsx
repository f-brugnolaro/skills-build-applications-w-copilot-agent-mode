import ResourceView from './ResourceView.jsx'
import { withApiFallback } from './api.js'

function uniqueTeams(items) {
  return new Set(items.map((item) => item.team).filter(Boolean)).size
}

export default function Users() {
  const endpoint = withApiFallback(
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`,
    'users',
  )

  return (
    <ResourceView
      endpoint={endpoint}
      resource="users"
      title="Users"
      description="View athlete profiles, roles, and the goals driving each plan."
      metrics={[
        { label: 'Registered users', getValue: (_items, total) => total },
        { label: 'Teams represented', getValue: (items) => uniqueTeams(items) },
      ]}
      columns={[
        { key: 'name', label: 'Name', render: (item) => item.name },
        { key: 'email', label: 'Email', render: (item) => item.email },
        { key: 'team', label: 'Team', render: (item) => item.team },
        { key: 'role', label: 'Role', render: (item) => item.role },
        { key: 'age', label: 'Age', render: (item) => item.age },
        {
          key: 'fitnessGoal',
          label: 'Fitness goal',
          render: (item) => item.fitnessGoal,
        },
      ]}
    />
  )
}