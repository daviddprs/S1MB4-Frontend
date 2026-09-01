/**
 * BeritaCard.jsx — Shared card component
 *
 * Dipakai oleh BeritaTerbaruSection dan KategoriBeritaSection.
 * Props:
 *   item         - objek berita (id, judul, gambar_url, ringkasan,
 *                  tanggal_berita, created_at, penulis, views)
 *   onNavigate   - callback(id) saat card diklik
 *   badgeLabel   - override teks badge (misal "JATIM", "EJSC").
 *                  Jika tidak diisi, badge otomatis dari item.penulis
 *                  dengan format kata pertama nama, fallback "Berita".
 *   badgeColor   - hex warna solid badge; null = pakai warna teal default
 */
import './BeritaCard.css';

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Ikon mata (SVG inline, tanpa dependency library) */
function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Format angka ribuan: 3068 → "3.068" */
function formatViews(n) {
  if (n == null || isNaN(n)) return '0';
  return new Intl.NumberFormat('id-ID').format(n);
}

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

export function BeritaCard({ item, onNavigate, badgeLabel = null, badgeColor = null }) {
  /**
   * Resolusi badge text (prioritas):
   * 1. badgeLabel prop   — kalau section override (mis. "JATIM", "EJSC")
   * 2. item.penulis      — NAMA LENGKAP dari nama user (sebelumnya hanya kata pertama)
   *                        "Super Administrator" → "SUPER ADMINISTRATOR"
   *                        "Operator Satu"       → "OPERATOR SATU"
   *                        "Administrator"       → "ADMINISTRATOR"
   * 3. Fallback          — "Berita"
   */
  const badgeText = badgeLabel
    ?? (item.penulis ? item.penulis.trim() : 'Berita');

  // Style badge: warna solid (kategori) vs teal-light default
  const badgeStyle = badgeColor
    ? { background: badgeColor, color: '#fff' }
    : undefined;

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
        {/* Baris atas: Badge kiri + Views kanan */}
        <div className="bts-card__meta-row">
          <span className="bts-card__badge" style={badgeStyle}>
            {badgeText}
          </span>
          {item.views != null && (
            <span className="bts-card__views" aria-label={`${formatViews(item.views)} kali dilihat`}>
              <EyeIcon />
              {formatViews(item.views)}
            </span>
          )}
        </div>

        {/* Tanggal */}
        {(item.tanggal_berita || item.created_at) && (
          <time className="bts-card__date" dateTime={item.tanggal_berita ?? item.created_at}>
            {formatDate(item.tanggal_berita ?? item.created_at)}
          </time>
        )}

        {/* Judul */}
        <h3 className="bts-card__title">{item.judul}</h3>

        {/* Excerpt */}
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

/** Skeleton placeholder saat loading */
export function BeritaCardSkeleton() {
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
