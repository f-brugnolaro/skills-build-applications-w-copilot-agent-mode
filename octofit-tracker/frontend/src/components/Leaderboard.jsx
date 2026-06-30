import ResourceView from './ResourceView.jsx'
import { withApiFallback } from './api.js'

function highestScore(items) {
  return items.reduce(
    (best, item) => Math.max(best, item.points ?? 0),
    0,
  )
}

export default function Leaderboard() {
  const endpoint = withApiFallback(
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`,
    'leaderboard',
  )

  return (
    <ResourceView
      endpoint={endpoint}
      resource="leaderboard"
      title="Leaderboard"
      description="Review standings sorted by rank and team contribution."
      metrics={[
        { label: 'Ranked athletes', getValue: (_items, total) => total },
        { label: 'Top score', getValue: (items) => highestScore(items) },
      ]}
      columns={[
        { key: 'rank', label: 'Rank', render: (item) => item.rank },
        {
          key: 'displayName',
          label: 'Display name',
          render: (item) => item.displayName,
        },
        { key: 'userEmail', label: 'Email', render: (item) => item.userEmail },
        { key: 'team', label: 'Team', render: (item) => item.team },
        { key: 'points', label: 'Points', render: (item) => item.points },
      ]}
    />
  )
}