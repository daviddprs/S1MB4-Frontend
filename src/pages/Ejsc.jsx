import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJson } from '../lib/api';
import { BeritaCard, BeritaCardSkeleton } from '../components/BeritaCard/BeritaCard';
import './Ejsc.css';

/* ── Icons ── */
function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const PER_PAGE = 12;

/* ══════════════════════════════════════════════════════════
   HALAMAN EJSC
══════════════════════════════════════════════════════════ */
export default function Ejsc() {
  const navigate = useNavigate();

  const [berita, setBerita]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [page, setPage]         = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal]       = useState(0);

  const loadBerita = useCallback((targetPage) => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson(
      `/berita?kategori=ejsc&per_page=${PER_PAGE}&page=${targetPage}`,
      { signal: ctrl.signal }
    )
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        setBerita(raw);
        setLastPage(data?.last_page ?? 1);
        setTotal(data?.total ?? raw.length);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message ?? 'Gagal memuat data.');
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  useEffect(() => loadBerita(page), [loadBerita, page]);

  /* Navigasi ke detail berita (lewat halaman Berita) */
  function handleCardClick(id) {
    navigate('/berita', { state: { openId: id } });
  }

  function handlePrev() {
    if (page > 1) setPage((p) => p - 1);
  }
  function handleNext() {
    if (page < lastPage) setPage((p) => p + 1);
  }

  return (
    <main className="ejsc-page" aria-label="Halaman EJSC — East Java Super Corridor">
      <div className="ejsc-page__inner">

        {/* ── Page header ── */}
        <header className="ejsc-header">
          <div className="ejsc-header__eyebrow" aria-label="Kategori berita">
            ⚡ EJSC
          </div>
          <h1 className="ejsc-header__title">East Java Super Corridor</h1>
          <div className="ejsc-header__bar" aria-hidden="true" />
          <p className="ejsc-header__desc">
            Berita dan informasi seputar program East Java Super Corridor (EJSC)
            di wilayah kerja Bakorwil I Madiun.
          </p>
        </header>

        {/* ── Loading ── */}
        {loading && (
          <div className="ejsc-loading" role="status" aria-live="polite">
            <div className="ejsc-spinner" aria-hidden="true" />
            Memuat berita EJSC…
          </div>
        )}

        {/* Skeleton grid saat loading */}
        {loading && (
          <div className="ejsc-grid" aria-hidden="true">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <BeritaCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="ejsc-error" role="alert">
            <ErrorIcon /> {error}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && berita.length === 0 && (
          <div className="ejsc-empty">
            <div className="ejsc-empty__icon" aria-hidden="true">📡</div>
            <p className="ejsc-empty__title">Belum ada berita EJSC saat ini</p>
            <p className="ejsc-empty__sub">
              Berita seputar East Java Super Corridor akan ditampilkan di sini.
              Silakan kembali lagi nanti.
            </p>
          </div>
        )}

        {/* ── Stat bar + grid ── */}
        {!loading && !error && berita.length > 0 && (
          <>
            {/* Stat: total berita */}
            <div className="ejsc-stat" aria-live="polite">
              <div className="ejsc-stat__item">
                <span className="ejsc-stat__num">{total}</span>
                <span>berita EJSC</span>
              </div>
              {lastPage > 1 && (
                <div className="ejsc-stat__item">
                  Halaman <strong style={{ color: '#1e3540', marginLeft: 4 }}>
                    {page}
                  </strong>&nbsp;/ {lastPage}
                </div>
              )}
            </div>

            {/* Grid berita — reuse BeritaCard, badge amber EJSC */}
            <div className="ejsc-grid">
              {berita.map((item) => (
                <BeritaCard
                  key={item.id}
                  item={item}
                  onNavigate={handleCardClick}
                  badgeLabel="EJSC"
                  badgeColor="#f59e0b"
                />
              ))}
            </div>

            {/* Paginasi */}
            {lastPage > 1 && (
              <nav className="ejsc-pagination" aria-label="Navigasi halaman berita EJSC">
                <button
                  className="ejsc-page-btn"
                  onClick={handlePrev}
                  disabled={page <= 1}
                  aria-label="Halaman sebelumnya"
                  type="button"
                >
                  <ChevronLeftIcon /> Sebelumnya
                </button>
                <span className="ejsc-page-info">
                  Halaman <strong>{page}</strong> dari <strong>{lastPage}</strong>
                </span>
                <button
                  className="ejsc-page-btn"
                  onClick={handleNext}
                  disabled={page >= lastPage}
                  aria-label="Halaman berikutnya"
                  type="button"
                >
                  Berikutnya <ChevronRightIcon />
                </button>
              </nav>
            )}
          </>
        )}

      </div>
    </main>
  );
}
