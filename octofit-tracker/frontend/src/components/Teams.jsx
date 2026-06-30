import ResourceView from './ResourceView.jsx'
import { withApiFallback } from './api.js'

function totalWeeklyPoints(items) {
  return items.reduce((total, item) => total + (item.weeklyPoints ?? 0), 0)
}

export default function Teams() {
  const endpoint = withApiFallback(
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`,
    'teams',
  )

  return (
    <ResourceView
      endpoint={endpoint}
      resource="teams"
      title="Teams"
      description="Compare city squads, mottos, roster size, and weekly momentum."
      metrics={[
        { label: 'Active teams', getValue: (_items, total) => total },
        { label: 'Combined points', getValue: (items) => totalWeeklyPoints(items) },
      ]}
      columns={[
        { key: 'name', label: 'Name', render: (item) => item.name },
        { key: 'city', label: 'City', render: (item) => item.city },
        { key: 'motto', label: 'Motto', render: (item) => item.motto },
        { key: 'members', label: 'Members', render: (item) => item.members },
        {
          key: 'weeklyPoints',
          label: 'Weekly points',
          render: (item) => item.weeklyPoints,
        },
      ]}
    />
  )
}