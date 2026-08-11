import './PpidList.css';

/**
 * Format ISO date → locale Indonesia
 * e.g. "2024-03-15T08:00:00.000000Z" → "15 Maret 2024"
 */
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/**
 * Render the action button/badge based on the "jenis" field.
 */
function ActionButton({ jenis, fileUrl, url }) {
  if (jenis === 'dokumen' && fileUrl) {
    return (
      <a
        className="ppid-btn ppid-btn--dokumen"
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Unduh dokumen"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Unduh Dokumen
      </a>
    );
  }

  if (jenis === 'link' && url) {
    return (
      <a
        className="ppid-btn ppid-btn--link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kunjungi tautan"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M6 2H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8" stroke="currentColor"
            strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 1h4v4M13 1 7 7" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Kunjungi Tautan
      </a>
    );
  }

  /* fallback — neither dokumen nor link available */
  if (fileUrl) {
    return (
      <a className="ppid-btn ppid-btn--dokumen" href={fileUrl}
        target="_blank" rel="noopener noreferrer">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.7"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Unduh Dokumen
      </a>
    );
  }
  if (url) {
    return (
      <a className="ppid-btn ppid-btn--link" href={url}
        target="_blank" rel="noopener noreferrer">
        Kunjungi Tautan
      </a>
    );
  }

  return (
    <span className="ppid-badge ppid-badge--unavailable" aria-label="Belum tersedia">
      Belum Tersedia
    </span>
  );
}

/**
 * PpidList
 * @param {{ items: Array, showDeskripsi?: boolean }} props
 */
export default function PpidList({ items = [], showDeskripsi = true }) {
  if (!items.length) {
    return (
      <div className="ppid-list--empty" role="status">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#c8e6e8" strokeWidth="2"/>
          <path d="M13 20h14M20 13v14" stroke="#c8e6e8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p>Belum ada data yang tersedia.</p>
      </div>
    );
  }

  return (
    <ul className="ppid-list" aria-label="Daftar informasi PPID">
      {items.map((item, idx) => {
        const dateStr = formatDate(item.published_at);
        return (
          <li key={item.id ?? idx} className="ppid-card">
            {/* Number badge */}
            <div className="ppid-card__num" aria-hidden="true">
              {(item.urutan ?? idx + 1).toString().padStart(2, '0')}
            </div>

            {/* Content */}
            <div className="ppid-card__body">
              <h3 className="ppid-card__title">
                {item.nama_informasi ?? '—'}
              </h3>
              {showDeskripsi && item.deskripsi && (
                <p className="ppid-card__desc">{item.deskripsi}</p>
              )}
              {dateStr && (
                <time className="ppid-card__date" dateTime={item.published_at}>
                  {dateStr}
                </time>
              )}
            </div>

            {/* Action */}
            <div className="ppid-card__action">
              <ActionButton
                jenis={item.jenis}
                fileUrl={item.file ?? item.file_url}
                url={item.url}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
