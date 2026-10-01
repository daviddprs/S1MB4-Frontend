import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import './PpidPage.css';

/**
 * ProfilLhkpnLhkan — /profil/lhkpn-lhkan
 *
 * Fetches LHKPN-LHKAN data from /ppid/dokumen/lhkpn-lhkan
 * (jenis_dokumen id = 29) and displays as a table.
 * Follows the same 2-column layout pattern as other Profil pages.
 */
export default function ProfilLhkpnLhkan() {
  /* ── LHKPN-LHKAN data ── */
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  /* ── Sidebar video ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    /* Fetch LHKPN-LHKAN items */
    setLoading(true);
    setError(null);
    fetchJson('/ppid/dokumen/lhkpn-lhkan', { signal: ctrl.signal })
      .then((data) => {
        const raw = data?.data ?? data;
        setItems(Array.isArray(raw) ? raw : []);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    /* Fetch sidebar videos */
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

  return (
    <main className="pr-page" aria-label="LHKPN-LHKAN Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">LHKPN-LHKAN</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ═══════════════════════════════════════════════════════════
                SECTION — Tabel LHKPN-LHKAN (data dinamis)
            ════════════════════════════════════════════════════════════ */}
            <section aria-labelledby="heading-lhkpn">
              <h2 className="pr-section__heading" id="heading-lhkpn">
                LAPORAN HARTA KEKAYAAN BAGI PEJABAT NEGARA
              </h2>

              {loading && (
                <div className="ppid-loading" role="status" aria-live="polite">
                  <div className="ppid-spinner" aria-hidden="true" />
                  Memuat data…
                </div>
              )}

              {!loading && error && (
                <div className="ppid-error" role="alert">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.5"/>
                    <path d="M9 5v4M9 12v.5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              {!loading && !error && (
                <div className="pr-table-wrap">
                  <div className="pr-table-scroll" role="region"
                    aria-label="Tabel LHKPN-LHKAN" tabIndex="0">
                    <table className="pr-table" aria-describedby="heading-lhkpn">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: '50px' }}>No</th>
                          <th scope="col">Informasi</th>
                          <th scope="col" style={{ width: '100px' }}>Dokumen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.length === 0 ? (
                          <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '32px 16px', color: '#5e8694' }}>
                              Belum ada data yang tersedia.
                            </td>
                          </tr>
                        ) : (
                          items.map((item, idx) => {
                            const href =
                              item.jenis === 'dokumen'
                                ? (item.file_url ?? item.file ?? null)
                                : item.jenis === 'link'
                                  ? (item.url ?? null)
                                  : (item.file_url ?? item.file ?? item.url ?? null);

                            return (
                              <tr key={item.id ?? idx}>
                                <td>{idx + 1}</td>
                                <td className="pr-table--nama">
                                  {item.nama_informasi ?? '—'}
                                </td>
                                <td>
                                  {href ? (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: 'var(--pr-teal)',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                      }}
                                    >
                                      Lihat
                                    </a>
                                  ) : (
                                    <span style={{ color: '#999' }}>—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* ── Kolom kanan: sidebar ── */}
          <div className="bts pr-visimisi-sidebar-wrap">
            <Sidebar
              videos={videos}
              videoLoading={videoLoading}
              videoError={videoError}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
