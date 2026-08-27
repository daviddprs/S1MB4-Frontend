import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../lib/api';
import './SakipRb.css';

/* ── Icon helpers ── */
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v8M4 6l3 3 3-3M2 11h10"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M5.5 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 1H12v3.5M12 1 6.5 6.5"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5"/>
      <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Action button per dokumen ── */
function ActionBtn({ item }) {
  if (item.jenis === 'dokumen' && item.file_url) {
    return (
      <a className="sk-btn sk-btn--dokumen" href={item.file_url}
        target="_blank" rel="noopener noreferrer" aria-label={`Unduh ${item.jenis_dokumen}`}>
        <DownloadIcon /> Unduh
      </a>
    );
  }
  if (item.jenis === 'link' && item.url) {
    return (
      <a className="sk-btn sk-btn--link" href={item.url}
        target="_blank" rel="noopener noreferrer" aria-label={`Buka tautan ${item.jenis_dokumen}`}>
        <LinkIcon /> Buka Tautan
      </a>
    );
  }
  return <span className="sk-btn sk-btn--unavailable">Belum Tersedia</span>;
}

/* ── Document card ── */
function SakipCard({ item, no }) {
  return (
    <div className="sk-card">
      <div className="sk-card__num" aria-hidden="true">
        {String(no).padStart(2, '0')}
      </div>
      <div className="sk-card__body">
        <h3 className="sk-card__title">{item.jenis_dokumen}</h3>
        <div className="sk-card__meta">
          {item.klasifikasi && (
            <span className="sk-card__klasifikasi">{item.klasifikasi}</span>
          )}
          <span className="sk-card__tahun">Tahun {item.tahun}</span>
        </div>
      </div>
      <div className="sk-card__action">
        <ActionBtn item={item} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function SakipRb() {
  const [tahunList, setTahunList]     = useState([]);
  const [tahunAktif, setTahunAktif]   = useState(null);
  const [items, setItems]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const loadData = useCallback((tahun) => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    const path = tahun ? `/sakip-rb?tahun=${tahun}` : '/sakip-rb';

    fetchJson(path, { signal: ctrl.signal })
      .then((res) => {
        setTahunList(res.tahun_tersedia ?? []);
        setTahunAktif(res.tahun_aktif ?? tahun);
        setItems(res.data ?? []);
      })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  /* Load initial data */
  useEffect(() => loadData(null), [loadData]);

  const handleYearChange = (tahun) => {
    if (tahun === tahunAktif) return;
    setTahunAktif(tahun);
    loadData(tahun);
  };

  const filled  = items.filter((i) => i.jenis !== null).length;

  return (
    <div className="sk-page">
      <div className="sk-page__inner">

        {/* ── Header ── */}
        <header className="sk-header">
          <h1 className="sk-header__title">SAKIP & Reformasi Birokrasi</h1>
          <div className="sk-header__bar" aria-hidden="true" />
          <p className="sk-header__desc">
            Dokumen Sistem Akuntabilitas Kinerja Instansi Pemerintah dan
            Reformasi Birokrasi Bakorwil I Madiun.
          </p>
        </header>

        {/* ── Loading ── */}
        {loading && (
          <div className="sk-loading" role="status" aria-live="polite">
            <div className="sk-spinner" aria-hidden="true" />
            Memuat dokumen…
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="sk-error" role="alert">
            <ErrorIcon /> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Year tabs ── */}
            {tahunList.length > 1 && (
              <nav className="sk-year-tabs" aria-label="Filter tahun dokumen">
                {tahunList.map((t) => (
                  <button
                    key={t}
                    className={`sk-year-btn${t === tahunAktif ? ' active' : ''}`}
                    onClick={() => handleYearChange(t)}
                    aria-pressed={t === tahunAktif}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </nav>
            )}

            {/* ── Stat bar ── */}
            {items.length > 0 && (
              <div className="sk-stat" aria-live="polite">
                <div className="sk-stat__item">
                  <span className="sk-stat__num">{filled}</span>
                  <span>/ {items.length} dokumen tersedia</span>
                </div>
                {tahunAktif && (
                  <div className="sk-stat__item">
                    Tahun <strong style={{ color: '#1e3540' }}>{tahunAktif}</strong>
                  </div>
                )}
              </div>
            )}

            {/* ── Empty state ── */}
            {items.length === 0 && (
              <div className="sk-empty">
                <div className="sk-empty__icon" aria-hidden="true">📂</div>
                <p className="sk-empty__title">Belum ada dokumen</p>
                <p className="sk-empty__sub">
                  {tahunAktif
                    ? `Tidak ada dokumen untuk tahun ${tahunAktif}.`
                    : 'Silakan kembali lagi nanti.'}
                </p>
              </div>
            )}

            {/* ── Document list ── */}
            {items.length > 0 && (
              <ul className="sk-list" aria-label={`Daftar dokumen SAKIP-RB tahun ${tahunAktif}`}
                  style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {items.map((item, idx) => (
                  <li key={item.id}>
                    <SakipCard item={item} no={idx + 1} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

      </div>
    </div>
  );
}
