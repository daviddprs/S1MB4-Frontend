import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

const VISI =
  'Terwujudnya Masyarakat Jawa Timur Yang Adil, Sejahtera, Unggul Dan Berakhlak Dengan Tata Kelola Pemerintahan Yang Partisipatoris Inklusif Melalui Kerja Bersama Dan Semangat Gotong Royong';

const MISI = [
  'Mewujudkan Keseimbangan Pembangunan Ekonomi, Baik antar Kelompok, antar Sektor dan Keterhubungan Wilayah.',
  'Terciptanya Kesejahteraan yang Berkeadilan Sosial, Pemenuhan Kebutuhan Dasar Terutama Kesehatan dan Pendidikan, Penyediaan Lapangan Kerja dengan Memperhatikan Kelompok Rentan.',
  'Tata Kelola Pemerintahan yang Bersih, Inovatif, Terbuka, Partisipatoris Memperkuat Demokrasi Kewargaan untuk Menghadirkan Ruang Sosial yang menghargai prinsip Kebhinekaan.',
  'Melaksanakan Pembangunan Berdasarkan Semangat Gotong Royong, Berwawasan Lingkungan untuk Menjamin Keselarasan Ruang Ekologi, Ruang Sosial, Ruang Ekonomi dan Ruang Budaya.',
];

export default function ProfilVisiMisi() {
  // ── Video state (sama persis seperti di BeritaTerbaruSection) ──
  const [videos, setVideos]        = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]    = useState(null);

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
    <main className="pr-page" aria-label="Visi dan Misi Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        {/* Header dipindah KE DALAM grid (kolom kiri) supaya sidebar/gambar
            sejajar rata atas dengan judul halaman, bukan mulai di bawahnya. */}
        <div className="pr-layout">

          {/* Kolom kiri: header + konten */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Visi Dan Misi</h1>
              <div className="pr-header__bar" aria-hidden="true" />
              <p className="pr-header__desc">
                Visi dan Misi Badan Koordinasi Wilayah Pemerintahan dan Pembangunan
                Provinsi Jawa Timur di Madiun.
              </p>
            </header>

            {/* VISI */}
            <section className="pr-section" aria-labelledby="heading-visi">
              <h2 className="pr-section__heading" id="heading-visi">VISI</h2>
              <p className="pr-section__text pr-visi-text">{VISI}</p>
            </section>

            {/* MISI */}
            <section className="pr-section" aria-labelledby="heading-misi">
              <h2 className="pr-section__heading" id="heading-misi">MISI</h2>
              <ol className="pr-misi-plain" aria-label="Daftar Misi">
                {MISI.map((teks, idx) => (
                  <li key={idx} className="pr-misi-plain__item">
                    {teks}
                  </li>
                ))}
              </ol>
            </section>

          </div>

          {/* Kolom kanan: sidebar reuse dari Beranda (banner + VIDEO) */}
          {/* Dibungkus div agar CSS var --bts-* dari .bts tersedia */}
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