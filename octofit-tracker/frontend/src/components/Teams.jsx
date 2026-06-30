import ResourceView from './ResourceView.jsx'

function totalWeeklyPoints(items) {
  return items.reduce((total, item) => total + (item.weeklyPoints ?? 0), 0)
}

export default function Teams() {
  return (
    <ResourceView
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