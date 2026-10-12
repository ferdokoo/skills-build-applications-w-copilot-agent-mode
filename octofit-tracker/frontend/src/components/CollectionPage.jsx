import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.length
  }

  if (typeof value === 'object') {
    const name = [value.firstName, value.lastName].filter(Boolean).join(' ')
    return name || value.name || value.username || value._id || value.id || '—'
  }

  return value
}

function CollectionPage({ title, description, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        const collection = await fetchCollection(endpoint, {
          signal: controller.signal,
        })
        setRecords(collection)
        setStatus('success')
      } catch (requestError) {
        if (controller.signal.aborted) {
          return
        }
        setError(requestError.message)
        setStatus('error')
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {status === 'success' && (
          <span className="record-count">
            {records.length} {records.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      <div className="data-card">
        {status === 'loading' && (
          <div className="status-message" role="status">
            Loading {title.toLowerCase()}…
          </div>
        )}
        {status === 'error' && (
          <div className="status-message error" role="alert">
            Could not load {title.toLowerCase()}: {error}
          </div>
        )}
        {status === 'success' && records.length === 0 && (
          <div className="status-message">No {title.toLowerCase()} found.</div>
        )}
        {status === 'success' && records.length > 0 && (
          <table className="table table-hover">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>
                      {column.render
                        ? column.render(record)
                        : formatValue(record[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default CollectionPage
