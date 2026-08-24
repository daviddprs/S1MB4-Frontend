import { useState, useEffect } from 'react';
import { fetchJson } from '../../lib/api';
import bannerBakorwil from '../../assets/banner-bakorwil-madiun.jpg';
import './BeritaTerbaruSection.css';

/* ════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════ */

/** Format tanggal ke "24 Agu 2026" (bulan disingkat 3 huruf, Indonesia) */
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ════════════════════════════════════════════════════════════
   ICONS
════════════════════════════════════════════════════════════ */

function ArrowRightIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="rgba(255,255,255,0.9)" />
      <path d="M9 7.5l6 3.5-6 3.5V7.5z" fill="#0d9aa6" />
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
   SKELETON LOADERS
════════════════════════════════════════════════════════════ */

function CardSkeleton() {
  return (
    <div className="bts-card-skeleton" aria-hidden="true">
      <div className="bts-card-skeleton__img bts-skeleton" />
      <div className="bts-card-skeleton__body">
        <div className="bts-card-skeleton__badge bts-skeleton" />
        <div className="bts-card-skeleton__date bts-skeleton" />
        <div className="bts-card-skeleton__title bts-skeleton" />
        <div className="bts-card-skeleton__title2 bts-skeleton" />
        <div className="bts-card-skeleton__excerpt bts-skeleton" />
        <div className="bts-card-skeleton__excerpt2 bts-skeleton" />
        <div className="bts-card-skeleton__excerpt3 bts-skeleton" />
      </div>
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="bts-video-skeleton" aria-hidden="true">
      <div className="bts-video-skeleton__thumb bts-skeleton" />
      <div className="bts-video-skeleton__body">
        <div className="bts-video-skeleton__line1 bts-skeleton" />
        <div className="bts-video-skeleton__line2 bts-skeleton" />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BERITA CARD
════════════════════════════════════════════════════════════ */

function BeritaCard({ item, onNavigate }) {
  return (
    <article
      className="bts-card"
      onClick={() => onNavigate(item.id)}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(item.id)}
      tabIndex={0}
      role="button"
      aria-label={`Baca berita: ${item.judul}`}
    >
      {/* Thumbnail */}
      <div className="bts-card__img-wrap">
        {item.gambar_url
          ? <img className="bts-card__img" src={item.gambar_url} alt={item.judul} loading="lazy" />
          : <div className="bts-card__img-placeholder" aria-hidden="true">📰</div>
        }
      </div>

      {/* Body */}
      <div className="bts-card__body">
        {/* Badge kategori statis */}
        <span className="bts-card__badge">Berita</span>

        {/* Tanggal — prefer tanggal_berita, fallback ke created_at */}
        {(item.tanggal_berita || item.created_at) && (
          <time className="bts-card__date" dateTime={item.tanggal_berita ?? item.created_at}>
            {formatDate(item.tanggal_berita ?? item.created_at)}
          </time>
        )}

        {/* Judul */}
        <h3 className="bts-card__title">{item.judul}</h3>

        {/* Cuplikan isi */}
        {item.ringkasan && (
          <p className="bts-card__excerpt">{item.ringkasan}</p>
        )}

        {/* Read more */}
        <span className="bts-card__readmore" aria-hidden="true">
          Baca selengkapnya <ArrowRightIcon />
        </span>
      </div>
    </article>
  );
}

/* ════════════════════════════════════════════════════════════
   VIDEO ITEM (sidebar)
════════════════════════════════════════════════════════════ */

function VideoItem({ video }) {
  return (
    <a
      className="bts-video-item"
      href={video.url_video}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Tonton video: ${video.judul_video}`}
    >
      {/* Thumbnail */}
      <div className="bts-video-item__thumb">
        {video.thumbnail_url
          ? (
            <>
              <img src={video.thumbnail_url} alt={video.judul_video} loading="lazy" />
              <div className="bts-video-item__play">
                <PlayIcon />
              </div>
            </>
          )
          : <div className="bts-video-item__thumb-placeholder" aria-hidden="true">🎬</div>
        }
      </div>

      {/* Info */}
      <div className="bts-video-item__info">
        <span className="bts-video-item__title">{video.judul_video}</span>
        <span className="bts-video-item__label">Tonton Video ↗</span>
      </div>
    </a>
  );
}

/* ════════════════════════════════════════════════════════════
   SIDEBAR
════════════════════════════════════════════════════════════ */

function Sidebar({ videos, videoLoading, videoError }) {
  return (
    <aside className="bts__sidebar">
      {/* ── Banner Bakorwil ── */}
      <div className="bts__banner-wrap">
        <img
          src={bannerBakorwil}
          alt="Banner Bakorwil I Madiun"
          className="bts__banner-img"
          loading="lazy"
        />
      </div>

      {/* ── Section VIDEO ── */}
      <div className="bts__video-section">
        <div className="bts__video-title-wrap">
          <div className="bts__video-title-bar" aria-hidden="true" />
          <h3 className="bts__video-title">VIDEO</h3>
        </div>

        {videoLoading && (
          <div className="bts__video-list" aria-busy="true" aria-label="Memuat video…">
            <VideoSkeleton />
            <VideoSkeleton />
            <VideoSkeleton />
          </div>
        )}

        {!videoLoading && videoError && (
          <p style={{ fontSize: '0.78rem', color: '#b91c1c', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <ErrorIcon /> Gagal memuat video.
          </p>
        )}

        {!videoLoading && !videoError && videos.length === 0 && (
          <p style={{ fontSize: '0.78rem', color: 'var(--bts-muted)' }}>
            Belum ada video tersedia.
          </p>
        )}

        {!videoLoading && !videoError && videos.length > 0 && (
          <div className="bts__video-list">
            {videos.map((v) => (
              <VideoItem key={v.id} video={v} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT: BeritaTerbaruSection
════════════════════════════════════════════════════════════ */

/**
 * BeritaTerbaruSection
 *
 * Ditampilkan di halaman Beranda (Home.jsx) di bawah section "Selamat Datang".
 * Fetch berita terbaru dari GET /api/berita?per_page=6 dan
 * video dari GET /api/videos.
 *
 * @param {Function} onNavigateToBerita - callback untuk navigasi ke halaman berita;
 *   dipanggil dengan (id) saat card diklik, atau tanpa argumen untuk daftar berita.
 */
export default function BeritaTerbaruSection({ onNavigateToBerita }) {
  // ── Berita state ──
  const [berita, setBerita]         = useState([]);
  const [beritaLoading, setBLoading] = useState(true);
  const [beritaError, setBError]     = useState(null);

  // ── Video state ──
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading]  = useState(true);
  const [videoError, setVError]      = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    // Fetch berita
    setBLoading(true);
    setBError(null);
    fetchJson('/berita?per_page=6', { signal: ctrl.signal })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        setBerita(raw);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setBError(err.message);
      })
      .finally(() => setBLoading(false));

    // Fetch video
    setVLoading(true);
    setVError(null);
    fetchJson('/videos', { signal: ctrl.signal })
      .then((data) => {
        const raw = Array.isArray(data) ? data : [];
        setVideos(raw);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setVError(err.message);
      })
      .finally(() => setVLoading(false));

    return () => ctrl.abort();
  }, []);

  /** Callback ke halaman Berita (list atau detail) */
  function handleCardClick(id) {
    if (typeof onNavigateToBerita === 'function') {
      onNavigateToBerita(id);
    }
  }

  function handleMoreClick(e) {
    e.preventDefault();
    if (typeof onNavigateToBerita === 'function') {
      onNavigateToBerita(null); // null = tampilkan daftar berita
    }
  }

  return (
    <section
      className="bts"
      aria-labelledby="bts-heading"
    >
      <div className="bts__inner">
        {/* ── Section header ── */}
        <div className="bts__header">
          <div className="bts__title-wrap">
            <div className="bts__title-bar" aria-hidden="true" />
            <h2 id="bts-heading" className="bts__title">BERITA TERBARU</h2>
          </div>
          <a
            href="#berita"
            className="bts__more-link"
            onClick={handleMoreClick}
            aria-label="Lihat semua berita"
          >
            Berita Lainnya <ArrowRightIcon size={11} />
          </a>
        </div>

        {/* ── Body: grid + sidebar ── */}
        <div className="bts__body">
          {/* ── Grid berita ── */}
          <div>
            {/* Loading skeleton */}
            {beritaLoading && (
              <div className="bts__grid" aria-busy="true" aria-label="Memuat berita…">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error */}
            {!beritaLoading && beritaError && (
              <div className="bts__error" role="alert">
                <ErrorIcon /> {beritaError}
              </div>
            )}

            {/* Empty */}
            {!beritaLoading && !beritaError && berita.length === 0 && (
              <div className="bts__empty">
                <div className="bts__empty-icon" aria-hidden="true">📭</div>
                <p className="bts__empty-title">Belum ada berita</p>
                <p className="bts__empty-sub">Silakan kembali lagi nanti.</p>
              </div>
            )}

            {/* Grid card berita */}
            {!beritaLoading && !beritaError && berita.length > 0 && (
              <div className="bts__grid">
                {berita.map((item) => (
                  <BeritaCard
                    key={item.id}
                    item={item}
                    onNavigate={handleCardClick}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar kanan ── */}
          <Sidebar
            videos={videos}
            videoLoading={videoLoading}
            videoError={videoError}
          />
        </div>
      </div>
    </section>
  );
}
