import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import PpidList from '../components/PpidList/PpidList';
import './PpidPage.css';

/**
 * PpidSimplePage — Generic PPID page for flat-array endpoints.
 *
 * Props:
 *   title    {string}  — Page heading, e.g. "Informasi Dikecualikan"
 *   endpoint {string}  — API path, e.g. "/ppid/dikecualikan"
 *
 * Response shape: flat array of items  OR  { data: [...] }
 */
export default function PpidSimplePage({ title, endpoint }) {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson(endpoint, { signal: ctrl.signal })
      .then((data) => {
        const raw = data?.data ?? data;
        setItems(Array.isArray(raw) ? raw : []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [endpoint]);

  return (
    <div className="ppid-page">
      <div className="ppid-page__inner">
        <h1 className="ppid-page__title">{title}</h1>
        <div className="ppid-page__title-bar" aria-hidden="true" />

        {/* Loading */}
        {loading && (
          <div className="ppid-loading" role="status" aria-live="polite">
            <div className="ppid-spinner" aria-hidden="true" />
            Memuat data…
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="ppid-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5"/>
              <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* List */}
        {!loading && !error && <PpidList items={items} />}
      </div>
    </div>
  );
}
