import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

/*
 * Data pejabat struktural — hardcoded (sprint berikutnya akan dimigrasikan ke database).
 * Untuk memperbarui data, edit array PEJABAT di bawah ini lalu deploy ulang.
 */
const PEJABAT = [
  { no: 1,  jabatan: 'KEPALA BADAN',                                nama: 'R. HERU WAHONO SANTOSO, S.Sos., MM' },
  { no: 2,  jabatan: 'SEKRETARIS',                                  nama: 'SYAMSUL HADY, S.Sos., M.Si.' },
  { no: 3,  jabatan: 'KA. SUB. BAGIAN UMUM & KEPEGAWAIAN',         nama: 'WARDOYO, S.Sos.' },
  { no: 4,  jabatan: 'KA. SUB. BAGIAN SUNGRAM',                    nama: 'SA. SAUD, S.Kom.' },
  { no: 5,  jabatan: 'KA. SUB. BAGIAN KEUANGAN',                   nama: 'MUHAMMAD ARIFIN, S.E.' },
  { no: 6,  jabatan: 'KEPALA BIDANG PEMERINTAHAN',                  nama: 'ARI SETYANTO, A.P., M.Si.' },
  { no: 7,  jabatan: 'KA. SUB. BID. PEMERINTAHAN I',               nama: 'PATMI IRAWATI, S.E.' },
  { no: 8,  jabatan: 'KA. SUB. BID. PEMERINTAHAN II',              nama: 'YENNI AFRIANI, S.Sos.' },
  { no: 9,  jabatan: 'KEPALA BIDANG PEMBANGUNAN EKONOMI',           nama: 'CICILIA SATYARINI YULIARSI, S.E.' },
  { no: 10, jabatan: 'KA. SUB. BID. PEMBANGUNAN EKONOMI I',        nama: 'EKA PUJIANTORO, S.STP., M.Sos.' },
  { no: 11, jabatan: 'KA. SUB. BID. PEMBANGUNAN EKONOMI II',       nama: 'SRI WAHYUNI, S.H.' },
  { no: 12, jabatan: 'KEPALA BIDANG KEMASYARAKATAN',               nama: 'GATOT SUBROTO, S.H.' },
  { no: 13, jabatan: 'KA. SUB. BID. KEMASYARAKATAN I',             nama: 'ATIK SUHENI, S.Pd.' },
  { no: 14, jabatan: 'KA. SUB. BID. KEMASYARAKATAN II',            nama: 'AGOENG WIDJAJADI, S.Sos.' },
  { no: 15, jabatan: 'KEPALA BIDANG SARANA PRASARANA',             nama: 'BUDI MARJONO, S.E., M.M.' },
  { no: 16, jabatan: 'KA. SUB. BID. SARANA PRASARANA I',           nama: 'HENI RUDI ASTUTIK, S.E.' },
  { no: 17, jabatan: 'KA. SUB. BID. SARANA PRASARANA II',          nama: 'AFFANDI YULIANTO, S.Sos., M.MSip.' },
];

export default function ProfilPejabatStruktural() {
  /* ── Video state — reuse sidebar yang sama dengan halaman Profil lain ── */
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading]  = useState(true);
  const [videoError, setVError]      = useState(null);

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
    <main className="pr-page" aria-label="Pejabat Struktural Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        {/* Header dipindah KE DALAM grid (kolom kiri) supaya sidebar/gambar
            sejajar rata atas dengan judul halaman, bukan mulai di bawahnya. */}
        <div className="pr-layout">

          {/* Kolom kiri: header + tabel pejabat */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Pejabat Struktural</h1>
              <div className="pr-header__bar" aria-hidden="true" />
              <p className="pr-header__desc">
                Daftar pejabat struktural Badan Koordinasi Wilayah Pemerintahan dan
                Pembangunan Provinsi Jawa Timur di Madiun.
              </p>
            </header>

            <section aria-labelledby="heading-pejabat">
              <h2 className="pr-section__heading" id="heading-pejabat">
                DAFTAR PEJABAT STRUKTURAL
              </h2>

              <div className="pr-table-wrap">
                <div className="pr-table-scroll" role="region"
                  aria-label="Tabel pejabat struktural" tabIndex="0">
                  <table className="pr-table" aria-describedby="heading-pejabat">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '50px' }}>No</th>
                        <th scope="col">Jabatan</th>
                        <th scope="col">Nama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PEJABAT.map((p) => (
                        <tr key={p.no}>
                          <td>{p.no}</td>
                          <td className="pr-table--jabatan">{p.jabatan}</td>
                          <td className="pr-table--nama">{p.nama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p style={{
                marginTop: '16px',
                fontSize: '0.78rem',
                color: '#5e8694',
                fontStyle: 'italic',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                * Data pejabat dapat berubah sewaktu-waktu mengikuti mutasi/pelantikan jabatan.
              </p>
            </section>
          </div>

          {/* Kolom kanan: sidebar reuse dari Beranda, Visi Misi, Kedudukan Alamat, Struktur Organisasi */}
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