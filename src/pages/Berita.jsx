import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchJson } from '../lib/api';
import './Berita.css';

/* ── Helpers ── */
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ── Arrow icon ── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Card placeholder image ── */
function ImagePlaceholder() {
  return <div className="bt-card__img-placeholder" aria-hidden="true">📰</div>;
}

/* ── Single news card ── */
function BeritaCard({ item, onClick }) {
  return (
    <article
      className="bt-card"
      onClick={() => onClick(item.id)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(item.id)}
      tabIndex={0}
      role="button"
      aria-label={`Baca berita: ${item.judul}`}
    >
      <div className="bt-card__img-wrap">
        {item.gambar_url
          ? <img className="bt-card__img" src={item.gambar_url} alt={item.judul} loading="lazy" />
          : <ImagePlaceholder />
        }
      </div>
      <div className="bt-card__body">
        <div className="bt-card__meta">
          {/* prefer tanggal_berita, fallback ke created_at */}
          <time className="bt-card__date" dateTime={item.tanggal_berita ?? item.created_at}>
            {formatDate(item.tanggal_berita ?? item.created_at)}
          </time>
          {item.penulis && <>
            <span className="bt-card__dot" aria-hidden="true">●</span>
            <span className="bt-card__author">{item.penulis}</span>
          </>}
        </div>
        <h2 className="bt-card__title">{item.judul}</h2>
        {item.ringkasan && (
          <p className="bt-card__excerpt">{item.ringkasan}</p>
        )}
        <span className="bt-card__read-more" aria-hidden="true">
          Baca Selengkapnya <ArrowRight />
        </span>
      </div>
    </article>
  );
}

/* ── Pagination ── */
function Pagination({ current, last, onPage }) {
  if (last <= 1) return null;

  const pages = [];
  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || Math.abs(i - current) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <nav className="bt-pagination" aria-label="Navigasi halaman berita">
      <button
        className="bt-pagination__btn"
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        aria-label="Halaman sebelumnya"
      >
        ‹
      </button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`ellipsis-${i}`} style={{ color: '#9baabb', fontSize: '0.85rem', padding: '0 4px' }}>…</span>
          : <button
              key={p}
              className={`bt-pagination__btn${p === current ? ' active' : ''}`}
              onClick={() => p !== current && onPage(p)}
              aria-label={`Halaman ${p}`}
              aria-current={p === current ? 'page' : undefined}
            >
              {p}
            </button>
      )}
      <button
        className="bt-pagination__btn"
        onClick={() => onPage(current + 1)}
        disabled={current === last}
        aria-label="Halaman berikutnya"
      >
        ›
      </button>
    </nav>
  );
}

/* ── Error icon ── */
function ErrorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5"/>
      <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   DETAIL VIEW
══════════════════════════════════════════════════════════ */
function BeritaDetail({ id, onBack }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson(`/berita/${id}`, { signal: ctrl.signal })
      .then((data) => setArticle(data))
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => ctrl.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="bt-loading" role="status" aria-live="polite">
        <div className="bt-spinner" aria-hidden="true" />
        Memuat artikel…
      </div>
    );
  }

  if (error || !article) {
    return (
      <>
        <button className="bt-back-btn" onClick={onBack} aria-label="Kembali ke daftar berita">
          ‹ Kembali
        </button>
        <div className="bt-error" role="alert">
          <ErrorIcon /> {error ?? 'Artikel tidak ditemukan.'}
        </div>
      </>
    );
  }

  return (
    <div className="bt-detail">
      <button className="bt-back-btn" onClick={onBack} aria-label="Kembali ke daftar berita">
        ‹ Kembali ke Berita
      </button>

      {/* Hero image */}
      <div className="bt-detail__hero">
        {article.gambar_url
          ? <img src={article.gambar_url} alt={article.judul} />
          : <span className="bt-detail__hero-placeholder" aria-hidden="true">📰</span>
        }
      </div>

      {/* Meta */}
      <div className="bt-detail__meta">
        <span className="bt-detail__tag">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zm.5 7.5h-1v-3h1v3zm0-4h-1v-1h1v1z"/>
          </svg>
          Berita
        </span>
        <time className="bt-detail__date" dateTime={article.tanggal_berita ?? article.created_at}>
          {formatDate(article.tanggal_berita ?? article.created_at)}
        </time>
        {article.penulis && (
          <span className="bt-detail__author">oleh {article.penulis}</span>
        )}
      </div>

      <h1 className="bt-detail__title">{article.judul}</h1>
      <div className="bt-detail__divider" aria-hidden="true" />

      {/* Konten HTML dari TinyMCE */}
      <div
        className="bt-detail__konten"
        dangerouslySetInnerHTML={{ __html: article.konten }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LIST VIEW
══════════════════════════════════════════════════════════ */
function BeritaList({ onSelect }) {
  const [items, setItems]         = useState([]);
  const [page, setPage]           = useState(1);
  const [lastPage, setLastPage]   = useState(1);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const loadPage = useCallback((p) => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetchJson(`/berita?page=${p}&per_page=9`, { signal: ctrl.signal })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        setItems(raw);
        setPage(data?.current_page ?? p);
        setLastPage(data?.last_page ?? 1);
        setTotal(data?.total ?? raw.length);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch((err) => { if (err.name !== 'AbortError') setError(err.message); })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  useEffect(() => loadPage(1), [loadPage]);

  return (
    <>
      {/* Page header */}
      <header className="bt-header">
        <h1 className="bt-header__title">Berita</h1>
        <div className="bt-header__bar" aria-hidden="true" />
      </header>

      {/* Loading */}
      {loading && (
        <div className="bt-loading" role="status" aria-live="polite">
          <div className="bt-spinner" aria-hidden="true" />
          Memuat berita…
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bt-error" role="alert">
          <ErrorIcon /> {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && items.length === 0 && (
        <div className="bt-empty">
          <div className="bt-empty__icon" aria-hidden="true">📭</div>
          <p className="bt-empty__title">Belum ada berita</p>
          <p className="bt-empty__sub">Silakan kembali lagi nanti.</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && items.length > 0 && (
        <>
          <p style={{ fontSize: '0.8rem', color: 'var(--bt-muted)', marginBottom: '20px' }}>
            Menampilkan {items.length} dari {total} berita
          </p>
          <div className="bt-grid">
            {items.map((item) => (
              <BeritaCard key={item.id} item={item} onClick={onSelect} />
            ))}
          </div>
          <Pagination current={page} last={lastPage} onPage={loadPage} />
        </>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   ROOT: switches between list and detail
══════════════════════════════════════════════════════════ */
export default function Berita() {
  const location = useLocation();
  // Jika navigasi dari Home (card diklik), location.state?.openId berisi id artikel
  const [selectedId, setSelectedId] = useState(location.state?.openId ?? null);

  return (
    <div className="bt-page">
      <div className="bt-page__inner">
        {selectedId === null
          ? <BeritaList onSelect={setSelectedId} />
          : <BeritaDetail id={selectedId} onBack={() => setSelectedId(null)} />
        }
      </div>
    </div>
  );
}
