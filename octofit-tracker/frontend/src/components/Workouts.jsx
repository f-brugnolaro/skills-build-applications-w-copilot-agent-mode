import ResourceView from './ResourceView.jsx'
import { withApiFallback } from './api.js'

function totalExercises(items) {
  return items.reduce(
    (total, item) => total + (Array.isArray(item.exercises) ? item.exercises.length : 0),
    0,
  )
}

function renderExercises(item) {
  if (!Array.isArray(item.exercises) || item.exercises.length === 0) {
    return 'n/a'
  }

  return item.exercises.join(', ')
}

export default function Workouts() {
  const endpoint = withApiFallback(
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`,
    'workouts',
  )

  return (
    <ResourceView
      endpoint={endpoint}
      resource="workouts"
      title="Workouts"
      description="Browse suggested plans organized by focus area and effort level."
      metrics={[
        { label: 'Workout plans', getValue: (_items, total) => total },
        { label: 'Total exercises', getValue: (items) => totalExercises(items) },
      ]}
      columns={[
        { key: 'title', label: 'Title', render: (item) => item.title },
        { key: 'focus', label: 'Focus', render: (item) => item.focus },
        { key: 'level', label: 'Level', render: (item) => item.level },
        {
          key: 'durationMinutes',
          label: 'Duration',
          render: (item) => `${item.durationMinutes ?? 0} min`,
        },
        {
          key: 'exercises',
          label: 'Exercises',
          render: (item) => renderExercises(item),
        },
      ]}
    />
  )
}