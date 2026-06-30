import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection, getApiBaseUrl } from './api.js'

function formatValue(value, fallback = 'n/a') {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  return String(value)
}

export default function ResourceView({
  resource,
  title,
  description,
  columns,
  metrics,
}) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: true,
    error: '',
    source: resource,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const result = await fetchCollection(resource)

        if (!cancelled) {
          setState({
            items: result.items,
            total: result.total,
            source: result.source,
            loading: false,
            error: '',
          })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            items: [],
            total: 0,
            source: resource,
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [resource])

  const cards = metrics.map((metric) => ({
    label: metric.label,
    value: metric.getValue(state.items, state.total),
  }))

  const codespaceConfigured = Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim())
  const apiUrl = buildApiUrl(resource)

  return (
    <section className="resource-stack">
      <div className="resource-header">
        <div>
          <h2>{title}</h2>
          <p className="resource-subtitle">{description}</p>
        </div>
        <div>
          <p className="resource-meta">Source: {state.source}</p>
          <p className="resource-meta resource-url">{apiUrl}</p>
        </div>
      </div>

      {!codespaceConfigured && getApiBaseUrl() === 'http://localhost:8000/api' ? (
        <div className="status-panel status-panel-warning">
          <strong>VITE_CODESPACE_NAME is not set.</strong>
          <p className="muted-copy">
            The app avoided an undefined Codespaces URL and is using the local backend
            fallback instead.
          </p>
        </div>
      ) : null}

      {cards.length > 0 ? (
        <div className="metric-grid">
          {cards.map((card) => (
            <article key={card.label} className="metric-card">
              <p className="overview-label">{card.label}</p>
              <p className="metric-value">{card.value}</p>
            </article>
          ))}
        </div>
      ) : null}

      {state.loading ? (
        <div className="status-panel">
          <p>Loading {resource}...</p>
        </div>
      ) : null}

      {!state.loading && state.error ? (
        <div className="status-panel status-panel-error">
          <strong>Unable to load {resource}.</strong>
          <p className="muted-copy">{state.error}</p>
        </div>
      ) : null}

      {!state.loading && !state.error ? (
        <div className="table-shell">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.items.map((item, index) => (
                <tr key={item.id ?? item._id ?? `${resource}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(column.render(item))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {state.items.length === 0 ? (
            <div className="status-panel mt-3">
              <p>No records found.</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}