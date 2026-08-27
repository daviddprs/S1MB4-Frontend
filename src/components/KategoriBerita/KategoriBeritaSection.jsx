import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../../lib/api';
import { BeritaCard, BeritaCardSkeleton } from '../BeritaCard/BeritaCard';
import './KategoriBeritaSection.css';

/* ════════════════════════════════════════════════════════════
   ICON (lokal — hanya dipakai di section ini)
════════════════════════════════════════════════════════════ */

function ArrowRightIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
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

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT: KategoriBeritaSection
════════════════════════════════════════════════════════════ */

/**
 * KategoriBeritaSection
 *
 * Section reusable untuk berita per kategori (jatim / ejsc).
 * Menggunakan komponen BeritaCard yang SAMA dengan BeritaTerbaruSection
 * sehingga tampilan card IDENTIK — hanya warna badge yang berbeda.
 *
 * @param {string}   kategori      - "jatim" | "ejsc"
 * @param {string}   judulSection  - "BERITA JATIM" | "BERITA EJSC"
 * @param {string}   warnaBadge    - hex warna badge, misal "#2563eb" / "#f59e0b"
 * @param {Function} [onNavigate]  - callback(id) saat card diklik
 */
export default function KategoriBeritaSection({
  kategori,
  judulSection,
  warnaBadge,
  onNavigate,
}) {
  const [berita, setBerita]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ID unik untuk heading aksesibilitas
  const headingId = `kbs-heading-${kategori}`;

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson(`/berita?kategori=${encodeURIComponent(kategori)}&per_page=4`, {
      signal: ctrl.signal,
    })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        setBerita(raw);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [kategori]);

  // Sembunyikan section jika selesai load tapi tidak ada berita
  if (!loading && !error && berita.length === 0) return null;

  function handleCardClick(id) {
    if (typeof onNavigate === 'function') onNavigate(id);
  }

  return (
    <section
      className="kbs"
      aria-labelledby={headingId}
      // CSS custom property warna aksen untuk border-left judul
      style={{ '--kbs-accent': warnaBadge }}
    >
      <div className="kbs__inner">
        {/* ── Header ── */}
        <div className="kbs__header">
          <div className="kbs__title-wrap">
            <div className="kbs__title-bar" aria-hidden="true" />
            <h2 id={headingId} className="kbs__title">{judulSection}</h2>
          </div>
          <Link
            to={`/berita?kategori=${kategori}`}
            className="kbs__more-link"
            aria-label={`Lihat semua ${judulSection.toLowerCase()}`}
            onClick={(e) => {
              if (typeof onNavigate === 'function') {
                e.preventDefault();
                onNavigate(null);
              }
            }}
          >
            Berita Lainnya <ArrowRightIcon />
          </Link>
        </div>

        {/* ── Body: grid berita + spacer (identik proporsi bts__body) ── */}
        <div className="kbs__body">
          <div className="kbs__grid">
            {/* Loading skeleton */}
            {loading && Array.from({ length: 4 }).map((_, i) => (
              <BeritaCardSkeleton key={i} />
            ))}

            {/* Error state */}
            {!loading && error && (
              <div className="kbs__error" role="alert">
                <ErrorIcon /> {error}
              </div>
            )}

            {/* Card berita — badge teks dari item.penulis, warna teal default (sama BERITA TERBARU) */}
            {!loading && !error && berita.map((item) => (
              <BeritaCard
                key={item.id}
                item={item}
                onNavigate={handleCardClick}
              />
            ))}
          </div>
          {/* Spacer kanan — menyamakan lebar efektif grid dengan bts__body */}
          <div className="kbs__spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
