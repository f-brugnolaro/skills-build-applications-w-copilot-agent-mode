import ResourceView from './ResourceView.jsx'
import { withApiFallback } from './api.js'

function sumDuration(items) {
  return items.reduce((total, item) => total + (item.durationMinutes ?? 0), 0)
}

function sumCalories(items) {
  return items.reduce((total, item) => total + (item.caloriesBurned ?? 0), 0)
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'n/a'
}

export default function Activities() {
  const endpoint = withApiFallback(
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`,
    'activities',
  )

  return (
    <ResourceView
      endpoint={endpoint}
      resource="activities"
      title="Activities"
      description="Track recent sessions across the athlete roster."
      metrics={[
        { label: 'Records', getValue: (_items, total) => total },
        { label: 'Minutes logged', getValue: (items) => sumDuration(items) },
        { label: 'Calories burned', getValue: (items) => sumCalories(items) },
      ]}
      columns={[
        { key: 'userEmail', label: 'Athlete', render: (item) => item.userEmail },
        { key: 'type', label: 'Type', render: (item) => item.type },
        {
          key: 'durationMinutes',
          label: 'Duration',
          render: (item) => `${item.durationMinutes ?? 0} min`,
        },
        {
          key: 'caloriesBurned',
          label: 'Calories',
          render: (item) => item.caloriesBurned,
        },
        {
          key: 'distanceKm',
          label: 'Distance',
          render: (item) =>
            item.distanceKm === null || item.distanceKm === undefined
              ? 'n/a'
              : `${item.distanceKm} km`,
        },
        {
          key: 'activityDate',
          label: 'Date',
          render: (item) => formatDate(item.activityDate),
        },
      ]}
    />
  )
}