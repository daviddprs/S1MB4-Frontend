import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import maklumatSrc from '../assets/maklumat-pelayanan.jpg';

export default function PpidMaklumatPelayanan() {
  /* ── Video state — reuse sidebar yang sama dengan halaman Profil lain ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

  /* imgError — fallback jika gambar gagal dimuat */
  const [imgError, setImgError] = useState(false);

  /* Fetch video untuk sidebar */
  useEffect(() => {
    const ctrl = new AbortController();
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
    <main className="pr-page" aria-label="Maklumat Pelayanan PPID Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: header + gambar maklumat */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Maklumat Pelayanan Bakorwil I Madiun</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ── Gambar Maklumat Pelayanan (statis, tanpa lightbox) ── */}
            <section className="pr-section" aria-labelledby="heading-maklumat">

              {imgError ? (
                /* Fallback apabila gambar gagal di-load */
                <div className="pr-org-chart-placeholder" role="img"
                  aria-label="Gambar maklumat pelayanan gagal dimuat">
                  <div className="pr-org-chart-placeholder__icon" aria-hidden="true">📄</div>
                  <p className="pr-org-chart-placeholder__title">Maklumat Pelayanan</p>
                  <p className="pr-org-chart-placeholder__sub">
                    Gambar tidak dapat dimuat. Silakan muat ulang halaman.
                  </p>
                </div>
              ) : (
                <div className="pr-org-chart-wrap">
                  <img
                    src={maklumatSrc}
                    alt="Maklumat Pelayanan Informasi Publik PPID Bakorwil I Madiun"
                    className="pr-org-chart-img"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                </div>
              )}
            </section>

          </div>

          {/* Kolom kanan: sidebar reuse dari halaman Profil lainnya */}
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
