const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

function deriveCodespaceName(hostname) {
  const match = hostname.match(/^(.*?)-\d+\.app\.github\.dev$/)
  return match?.[1] ?? ''
}

export function getApiBaseUrl() {
  const hostName = typeof window === 'undefined' ? '' : window.location.hostname
  const derivedCodespaceName = deriveCodespaceName(hostName)
  const codespaceName = configuredCodespaceName || derivedCodespaceName

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

export function buildApiUrl(resource) {
  const trimmedResource = resource.replace(/^\/+|\/+$/g, '')
  return `${getApiBaseUrl()}/${trimmedResource}/`
}

export function withApiFallback(preferredUrl, resource) {
  const unresolvedMarker = 'https://undefined-8000.app.github.dev'

  if (
    !preferredUrl ||
    preferredUrl.includes(unresolvedMarker) ||
    preferredUrl.includes('https://-8000.app.github.dev')
  ) {
    return buildApiUrl(resource)
  }

  return preferredUrl
}

export function normalizeCollection(payload, resourceName) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length, source: 'array' }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], total: 0, source: 'empty' }
  }

  const collections = [
    payload.data,
    payload.results,
    payload.items,
    payload.docs,
    payload[resourceName],
  ]
  const items = collections.find(Array.isArray) ?? []

  const total =
    payload.total ??
    payload.count ??
    payload.totalCount ??
    payload.pagination?.total ??
    payload.meta?.total ??
    items.length

  return {
    items,
    total,
    source: payload.resource ?? resourceName,
  }
}

export async function fetchCollection(resourceName, endpoint = buildApiUrl(resourceName)) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload, resourceName)
}