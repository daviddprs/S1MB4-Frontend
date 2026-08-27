import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import PpidTable from '../components/PpidTable/PpidTable';
import './PpidPage.css';

/**
 * PpidSetiapSaat — /ppid/setiap-saat
 *
 * Response: [{ kategori, items: [...] }]  (already grouped by backend)
 * Renders each section as a heading + PpidTable (no tab UI).
 */
export default function PpidSetiapSaat() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson('/ppid/setiap-saat', { signal: ctrl.signal })
      .then((data) => {
        const raw = data?.data ?? data;
        setSections(Array.isArray(raw) ? raw : []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  return (
    <div className="ppid-page">
      <div className="ppid-page__inner">
        <h1 className="ppid-page__title">Informasi Setiap Saat</h1>
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

        {/* Empty state */}
        {!loading && !error && sections.length === 0 && (
          <PpidTable items={[]} />
        )}

        {/* All sections — one table per category */}
        {!loading && !error && sections.map((section, idx) => (
          <section
            key={section.kategori ?? idx}
            className="ppid-section"
            aria-labelledby={`ppid-setiapsaat-section-${idx}`}
          >
            <h2
              id={`ppid-setiapsaat-section-${idx}`}
              className="ppid-section__heading"
            >
              {section.kategori ?? `Kategori ${idx + 1}`}
            </h2>
            <PpidTable items={section.items ?? []} />
          </section>
        ))}
      </div>
    </div>
  );
}
