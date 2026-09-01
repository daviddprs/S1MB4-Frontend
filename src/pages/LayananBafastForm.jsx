import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

const FORMULIR = [
  {
    id: 'peminjaman',
    label: 'FORMULIR PEMINJAMAN',
    btnText: 'Buka Formulir Peminjaman',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfRoUlKdZCdr4u-Nx1fafTdL2eP6eLh7mOyOuK8yd_qKJwRrg/viewform',
  },
  {
    id: 'pembatalan',
    label: 'FORMULIR PEMBATALAN',
    btnText: 'Buka Formulir Pembatalan',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfSG6iTCDB8dtvUkt6h0SzIAv8fvqQUOqmOyECNdEPYn44jpQ/viewform',
  },
];

export default function LayananBafastForm() {
  // ── Video state (sama persis seperti di ProfilVisiMisi) ──
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);

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
    <main className="pr-page" aria-label="Formulir BAFAST — Bakorwil Madiun Fasilitasi">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        {/* Header dipindah KE DALAM grid (kolom kiri) supaya sidebar/gambar
            sejajar rata atas dengan judul halaman, bukan mulai di bawahnya. */}
        <div className="pr-layout">

          {/* Kolom kiri: header + daftar formulir (pola Visi Misi) */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Formulir Bakorwil Madiun Fasilitasi</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {FORMULIR.map((form) => (
              <section
                key={form.id}
                className="pr-section"
                aria-labelledby={`heading-${form.id}`}
              >
                <h2 className="pr-section__heading" id={`heading-${form.id}`}>
                  {form.label}
                </h2>
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`btn-${form.id}`}
                  aria-label={`${form.btnText} (buka di tab baru)`}
                  className="bafast-btn"
                >
                  {form.btnText}
                </a>
              </section>
            ))}
          </div>

          {/* Kolom kanan: sidebar banner (sama persis dengan Visi Misi & FAQ) */}
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