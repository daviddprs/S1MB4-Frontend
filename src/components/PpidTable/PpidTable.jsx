import './PpidTable.css';

/**
 * Render the "Tautan" column cell.
 * Reference style: just a plain blue text link — "Tautan".
 * Returns a dash when no link is available.
 */
function TautanCell({ jenis, fileUrl, url }) {
  const href =
    jenis === 'dokumen' ? (fileUrl ?? null) :
    jenis === 'link'    ? (url ?? null) :
    (fileUrl ?? url ?? null);

  if (!href) {
    return <span className="ppid-table__unavailable">-</span>;
  }

  return (
    <a
      className="ppid-table__link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      Tautan
    </a>
  );
}

/**
 * PpidTable
 *
 * Renders a clean minimal table: No | Informasi | Tautan.
 * Matches the bakorwilmadiun.jatimprov.go.id reference design.
 *
 * @param {{ items: Array, standalone?: boolean }} props
 */
export default function PpidTable({ items = [], standalone = false }) {
  const wrapperClass = `ppid-table__wrapper${standalone ? ' ppid-table__wrapper--standalone' : ''}`;

  if (!items.length) {
    return (
      <div className="ppid-table__empty" role="status">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="#ccc" strokeWidth="2"/>
          <path d="M11 18h14M18 11v14" stroke="#ccc" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Belum ada data yang tersedia.</span>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <table className="ppid-table" aria-label="Daftar informasi PPID">
        <thead>
          <tr>
            <th className="ppid-table__th ppid-table__th--no"  scope="col">No</th>
            <th className="ppid-table__th ppid-table__th--info" scope="col">Informasi</th>
            <th className="ppid-table__th ppid-table__th--link" scope="col">Tautan</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const href =
              item.jenis === 'dokumen' ? (item.file ?? item.file_url ?? null) :
              item.jenis === 'link'    ? (item.url ?? null) :
              (item.file ?? item.file_url ?? item.url ?? null);

            return (
              <tr
                key={item.id ?? idx}
                className={`ppid-table__row${href ? ' ppid-table__row--linked' : ''}`}
              >
                <td className="ppid-table__td ppid-table__td--no">{idx + 1}</td>
                <td className="ppid-table__td ppid-table__td--info">
                  <span className="ppid-table__nama">{item.nama_informasi ?? '—'}</span>
                  {item.deskripsi && (
                    <span className="ppid-table__desc">{item.deskripsi}</span>
                  )}
                </td>
                <td className="ppid-table__td ppid-table__td--link">
                  <TautanCell
                    jenis={item.jenis}
                    fileUrl={item.file ?? item.file_url}
                    url={item.url}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
