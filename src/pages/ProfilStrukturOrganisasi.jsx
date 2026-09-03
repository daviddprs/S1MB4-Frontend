import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import baganSrc from '../assets/organisasi.png';

const INTRO =
  'Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur di Madiun ' +
  'saat ini dipimpin oleh seorang Kepala Badan yaitu R. Heru Wahono Santoso, S.Sos., M.M. ' +
  'Susunan organisasi Bakorwil dimuat dalam Pasal 3 Ayat 1 Peraturan Gubernur Jawa Timur ' +
  'Nomor 134 Tahun 2016 Tentang Kedudukan, Susunan Organisasi, Uraian Tugas dan Fungsi ' +
  'Serta Tata Kerja Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa ' +
  'Timur adalah sebagai berikut:';

const CLOSING =
  'Sekretariat dipimpin oleh Sekretaris yang berada di bawah dan bertanggung jawab kepada ' +
  'Kepala Bakorwil. Masing-masing Bidang dipimpin oleh Kepala Bidang yang berada di bawah ' +
  'dan bertanggung jawab kepada Kepala Bakorwil. Masing-masing Sub Bagian dipimpin oleh ' +
  'Kepala Sub Bagian yang berada di bawah dan bertanggung jawab kepada Sekretaris. ' +
  'Masing-masing Sub Bidang dipimpin oleh Kepala Sub Bidang yang berada di bawah dan ' +
  'bertanggung jawab kepada Kepala Bidang, dimana sesuai dengan struktur organisasi yang ' +
  'ada pada Gambar Berikut:';

const DASAR_HUKUM =
  'Peraturan Gubernur Jawa Timur Nomor 134 Tahun 2016 Tentang Kedudukan, Susunan ' +
  'Organisasi, Uraian Tugas dan Fungsi Serta Tata Kerja Badan Koordinasi Wilayah ' +
  'Pemerintahan dan Pembangunan Provinsi Jawa Timur.';

const ORGANISASI = [
  {
    nama: 'Sekretariat',
    sub: 'Sub Bagian Umum dan Kepegawaian · Sub Bagian Penyusunan, Program dan Anggaran · Sub Bagian Keuangan',
  },
  {
    nama: 'Bidang Pemerintahan',
    sub: 'Sub Bidang Pemerintahan I · Sub Bidang Pemerintahan II',
  },
  {
    nama: 'Bidang Pembangunan Ekonomi',
    sub: 'Sub Bidang Pembangunan Ekonomi I · Sub Bidang Pembangunan Ekonomi II',
  },
  {
    nama: 'Bidang Kemasyarakatan',
    sub: 'Sub Bidang Kemasyarakatan I · Sub Bidang Kemasyarakatan II',
  },
  {
    nama: 'Bidang Sarana dan Prasarana',
    sub: 'Sub Bidang Sarana dan Prasarana I · Sub Bidang Sarana dan Prasarana II',
  },
  {
    nama: 'Kelompok Jabatan Fungsional',
    sub: null,
  },
];

export default function ProfilStrukturOrganisasi() {
  /* ── Video state — reuse sidebar yang sama dengan halaman Profil lain ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading]  = useState(true);
  const [videoError, setVError]      = useState(null);

  /* ── Lightbox state ── */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError]         = useState(false);

  const openLightbox  = useCallback(() => setLightboxOpen(true),  []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  /* Close on Escape key */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox]);

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
    <main className="pr-page" aria-label="Struktur Organisasi Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: header + konten */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Struktur Organisasi</h1>
              <div className="pr-header__bar" aria-hidden="true" />
              <p className="pr-header__desc">
                Susunan organisasi Bakorwil I Madiun berdasarkan Peraturan Gubernur Jawa Timur
                Nomor 134 Tahun 2016.
              </p>
            </header>

            {/* Intro */}
            <p className="pr-org-intro">{INTRO}</p>

            {/* SUSUNAN ORGANISASI — sekarang dibungkus card, konsisten dengan
                pola pr-info-card yang dipakai di halaman Kedudukan & Alamat */}
            <section className="pr-section" aria-labelledby="heading-org-list">
              <h2 className="pr-section__heading" id="heading-org-list">SUSUNAN ORGANISASI</h2>
              <div className="pr-info-card">
                <ol className="pr-misi-plain pr-org-plain" aria-label="Susunan organisasi Bakorwil I Madiun" style={{ margin: 0 }}>
                  {ORGANISASI.map((item, idx) => (
                    <li key={idx} className="pr-misi-plain__item pr-org-plain__item">
                      <span className="pr-org-plain__name">{item.nama}</span>
                      {item.sub && (
                        <span className="pr-org-plain__sub">membawahi: {item.sub}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Closing text */}
            <p className="pr-org-closing">{CLOSING}</p>

            {/* DASAR HUKUM — sudah pakai card sebelumnya, dibiarkan konsisten */}
            <section className="pr-section" aria-labelledby="heading-dasar-hukum">
              <h2 className="pr-section__heading" id="heading-dasar-hukum">DASAR HUKUM</h2>
              <div className="pr-info-card">
                <p className="pr-section__text" style={{ margin: 0 }}>{DASAR_HUKUM}</p>
              </div>
            </section>

          </div>

          {/* Kolom kanan: sidebar reuse dari Beranda, Visi Misi, Kedudukan Alamat */}
          <div className="bts pr-visimisi-sidebar-wrap">
            <Sidebar
              videos={videos}
              videoLoading={videoLoading}
              videoError={videoError}
            />
          </div>

        </div>

        {/* ── Bagan struktur organisasi (full-width di bawah layout) ── */}
        <section className="pr-section" aria-labelledby="heading-bagan" style={{ marginTop: '8px' }}>
          <h2 className="pr-section__heading" id="heading-bagan">BAGAN STRUKTUR ORGANISASI</h2>

          {imgError ? (
            /* Fallback apabila gambar gagal di-load */
            <div className="pr-org-chart-placeholder" role="img"
              aria-label="Bagan struktur organisasi gagal dimuat">
              <div className="pr-org-chart-placeholder__icon" aria-hidden="true">🏛️</div>
              <p className="pr-org-chart-placeholder__title">Bagan Struktur Organisasi</p>
              <p className="pr-org-chart-placeholder__sub">Gambar tidak dapat dimuat. Silakan muat ulang halaman.</p>
            </div>
          ) : (
            <div className="pr-org-chart-wrap">
              <button
                className="pr-org-chart-btn"
                onClick={openLightbox}
                aria-label="Klik untuk memperbesar bagan struktur organisasi"
                title="Klik untuk memperbesar"
              >
                <img
                  src={baganSrc}
                  alt="Bagan Struktur Organisasi Bakorwil I Madiun"
                  className="pr-org-chart-img"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
                <span className="pr-org-chart-zoom-hint" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  Klik untuk perbesar
                </span>
              </button>
            </div>
          )}
        </section>

        {/* ── Lightbox modal ── */}
        {lightboxOpen && (
          <div
            className="pr-lightbox-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Bagan Struktur Organisasi Bakorwil I Madiun — tampilan penuh"
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
                src={baganSrc}
                alt="Bagan Struktur Organisasi Bakorwil I Madiun"
                className="pr-lightbox-img"
              />
            </div>
          </div>
        )}

      </div>
    </main>
  );
}