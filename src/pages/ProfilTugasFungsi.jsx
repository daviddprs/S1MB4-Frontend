import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

export default function ProfilTugasFungsi() {
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
    <main className="pr-page" aria-label="Tugas Dan Fungsi Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: header + konten */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Tugas Dan Fungsi</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ═══════════════════════════════════
                SECTION TUGAS
            ═══════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-tugas">
              <h2 className="pr-section__heading" id="heading-tugas">TUGAS</h2>
              <div className="pr-info-card">
                <p className="pr-section__text" style={{ margin: 0 }}>
                  <strong>Tugas Pokok</strong> (sesuai Pergub 71/2023): Membantu Gubernur
                  dalam melakukan{' '}
                  <strong>
                    koordinasi pembinaan, pengawasan, supervisi, monitoring, dan evaluasi
                  </strong>{' '}
                  penyelenggaraan pemerintahan, pembangunan, tugas pembantuan, serta
                  optimalisasi pengembangan potensi Pemerintah Daerah Kabupaten/Kota di
                  wilayah kerjanya.
                </p>
              </div>
            </section>

            {/* ═══════════════════════════════════
                SECTION FUNGSI
            ═══════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-fungsi">
              <h2 className="pr-section__heading" id="heading-fungsi">FUNGSI</h2>
              <div className="pr-info-card">
                <ol className="pr-misi-plain" aria-label="Fungsi Bakorwil I Madiun">
                  <li className="pr-misi-plain__item">
                    Penyusunan kebijakan koordinasi sesuai lingkup tugas.
                  </li>
                  <li className="pr-misi-plain__item">
                    Pelaksanaan pembinaan dan pengawasan penyelenggaraan pemerintahan dan
                    pembangunan.
                  </li>
                  <li className="pr-misi-plain__item">
                    Pelaksanaan monitoring, evaluasi, dan supervisi atas penyelenggaraan
                    pemerintahan Kabupaten/Kota.
                  </li>
                  <li className="pr-misi-plain__item">
                    Optimalisasi pengembangan potensi daerah.
                  </li>
                  <li className="pr-misi-plain__item">
                    Koordinasi antar perangkat daerah provinsi dan kabupaten/kota.
                  </li>
                </ol>

                <hr className="pr-card-divider" aria-hidden="true" />

                <p className="pr-section__text" style={{ margin: 0 }}>
                  Bakorwil bukan hanya "koordinator", melainkan{' '}
                  <strong>perpanjangan tangan Gubernur</strong> yang strategis untuk
                  memastikan kebijakan provinsi berjalan di tingkat kabupaten/kota.
                </p>
              </div>
            </section>

          </div>

          {/* Kolom kanan: sidebar reuse dari Beranda (banner + VIDEO) */}
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
