import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import PpidList from '../components/PpidList/PpidList';
import './PpidPage.css';

/**
 * PpidBerkala — /ppid/berkala
 *
 * Response: [{ id_jenis_dokumen, nama_kategori, items: [...] }]
 * Renders tab pills per kategori, shows PpidList for active tab.
 */
export default function PpidBerkala() {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab]   = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);

    fetchJson('/ppid/berkala', { signal: ctrl.signal })
      .then((data) => {
        // API mengembalikan flat array langsung (bukan { data: [...] })
        const flat = Array.isArray(data) ? data : (data?.data ?? []);

        // Group items by jenis_dokumen untuk membentuk tab
        const grouped = [];
        const seen = new Map(); // jenis_dokumen -> index di grouped

        flat.forEach((item) => {
          const key = item.jenis_dokumen ?? 'Lainnya';
          if (!seen.has(key)) {
            seen.set(key, grouped.length);
            grouped.push({ id_jenis_dokumen: key, nama_kategori: key, items: [] });
          }
          grouped[seen.get(key)].items.push(item);
        });

        setCategories(grouped);
        if (grouped.length > 0) setActiveTab(grouped[0].id_jenis_dokumen);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  /* Items for the currently active tab */
  const activeItems =
    categories.find((c) => c.id_jenis_dokumen === activeTab)?.items ?? [];

  return (
    <div className="ppid-page">
      <div className="ppid-page__inner">
        <h1 className="ppid-page__title">Informasi Berkala</h1>
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

        {/* Tab pills */}
        {!loading && !error && categories.length > 0 && (
          <nav className="ppid-tabs" aria-label="Kategori informasi berkala" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id_jenis_dokumen}
                className={`ppid-tab${activeTab === cat.id_jenis_dokumen ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === cat.id_jenis_dokumen}
                aria-controls="ppid-berkala-panel"
                onClick={() => setActiveTab(cat.id_jenis_dokumen)}
                type="button"
              >
                {cat.nama_kategori}
              </button>
            ))}
          </nav>
        )}

        {/* List panel */}
        {!loading && !error && (
          <div
            id="ppid-berkala-panel"
            role="tabpanel"
            aria-label="Daftar informasi berkala"
          >
            <PpidList items={activeItems} />
          </div>
        )}
      </div>
    </div>
  );
}
