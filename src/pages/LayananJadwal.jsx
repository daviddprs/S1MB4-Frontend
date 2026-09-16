import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import alurLayananSrc from '../assets/alur-layanan.jpg';

/* ── Google Calendar embed — Jadwal Fasilitasi Gedung Bakorwil I Madiun ── */
const CALENDAR_SRC =
  'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&showPrint=0' +
  '&src=YmFmYXN0bWFkaXVuQGdtYWlsLmNvbQ' +
  '&src=aWQuaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ' +
  '&color=%23039be5&color=%230b8043';

/* ── Icon Kalender ── */
function IconCalendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

/* ── Zoom icon (reuse dari ProfilStrukturOrganisasi) ── */
function IconZoom() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  );
}

export default function LayananJadwal() {
  /* ── Video state ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

  /* ── Lightbox state (pola identik dengan ProfilStrukturOrganisasi) ── */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError]         = useState(false);

  const openLightbox  = useCallback(() => setLightboxOpen(true),  []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  /* Tutup lightbox dengan Escape */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox]);

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
    <main className="pr-page" aria-label="Jadwal Kegiatan Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: header + kalender + alur BAFAST */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Jadwal Kegiatan</h1>
              <div className="pr-header__bar" aria-hidden="true" />
              <p className="pr-header__desc">
                Jadwal fasilitasi dan kegiatan resmi di Gedung Bakorwil I Madiun.
                Informasi ini diperbarui secara berkala melalui Google Calendar.
              </p>
            </header>

            {/* ── Google Calendar embed ── */}
            <section className="pr-section" aria-labelledby="heading-jadwal">
              <h2 className="pr-section__heading" id="heading-jadwal">
                JADWAL FASILITASI GEDUNG BAKORWIL I MADIUN
              </h2>

              <div className="pr-map-wrap">
                <iframe
                  src={CALENDAR_SRC}
                  style={{ border: 0, height: '600px' }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  title="Jadwal Fasilitasi Gedung Bakorwil I Madiun"
                  aria-label="Kalender jadwal kegiatan Bakorwil I Madiun"
                />
              </div>

              <p className="pr-section__text" style={{ marginTop: 12 }}>
                <IconCalendar />
                {' '}Untuk informasi lebih lanjut atau pemesanan fasilitas gedung,
                silakan hubungi kantor Bakorwil I Madiun di{' '}
                <a href="tel:0351464151" style={{ color: 'var(--pr-teal)' }}>
                  (0351) 464151
                </a>.
              </p>
            </section>

            {/* ── Alur Peminjaman BAFAST (gambar infografis + lightbox) ── */}
            <section className="pr-section" aria-labelledby="heading-alur">
              <h2 className="pr-section__heading" id="heading-alur">
                ALUR PEMINJAMAN BAKORWIL FASILITAS (BAFAST)
              </h2>

              {imgError ? (
                /* Fallback apabila gambar gagal di-load */
                <div className="pr-org-chart-placeholder" role="img"
                  aria-label="Infografis alur peminjaman BAFAST gagal dimuat">
                  <div className="pr-org-chart-placeholder__icon" aria-hidden="true">📋</div>
                  <p className="pr-org-chart-placeholder__title">Alur Peminjaman BAFAST</p>
                  <p className="pr-org-chart-placeholder__sub">
                    Gambar tidak dapat dimuat. Silakan muat ulang halaman.
                  </p>
                </div>
              ) : (
                <div className="pr-org-chart-wrap">
                  <button
                    className="pr-org-chart-btn"
                    onClick={openLightbox}
                    aria-label="Klik untuk memperbesar infografis alur peminjaman BAFAST"
                    title="Klik untuk memperbesar"
                  >
                    <img
                      src={alurLayananSrc}
                      alt="Infografis Alur Peminjaman Bakorwil Fasilitas (BAFAST)"
                      className="pr-org-chart-img"
                      loading="lazy"
                      onError={() => setImgError(true)}
                    />
                    <span className="pr-org-chart-zoom-hint" aria-hidden="true">
                      <IconZoom />
                      Klik untuk perbesar
                    </span>
                  </button>
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

      {/* ── Lightbox modal (pola identik dengan ProfilStrukturOrganisasi) ── */}
      {lightboxOpen && (
        <div
          className="pr-lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Alur Peminjaman BAFAST — tampilan penuh"
        >
          <div className="pr-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="pr-lightbox-close"
              onClick={closeLightbox}
              aria-label="Tutup"
            >
              ×
            </button>
            <img
              src={alurLayananSrc}
              alt="Infografis Alur Peminjaman Bakorwil Fasilitas (BAFAST)"
              className="pr-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
