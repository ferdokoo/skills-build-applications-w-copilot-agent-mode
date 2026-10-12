const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(path, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  const collection =
    payload?.results ?? payload?.data ?? payload?.items ?? payload?.docs

  if (Array.isArray(collection)) {
    return collection
  }

  throw new TypeError('The API response did not contain a collection.')
}
