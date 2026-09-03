import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

/* ══════════════════════════════════════════════
   DATA FAQ — hardcoded (statis, tidak perlu DB)
══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    id: 'faq-1',
    pertanyaan: 'Apa itu Bakorwil I Madiun?',
    jawaban: (
      <p className="pr-section__text" style={{ margin: 0 }}>
        Badan Koordinasi Wilayah (Bakorwil) I Madiun merupakan perangkat Pemerintah Provinsi
        Jawa Timur yang bertugas membantu Gubernur Jawa Timur dalam melaksanakan koordinasi
        penyelenggaraan pemerintahan, pembangunan, dan pelayanan publik di wilayah kerja
        Bakorwil I Madiun. Bakorwil I Madiun berperan sebagai penghubung antara Pemerintah
        Provinsi Jawa Timur dengan pemerintah kabupaten/kota, instansi vertikal, serta
        berbagai pemangku kepentingan guna mewujudkan pembangunan yang terintegrasi dan
        pelayanan publik yang semakin baik.
      </p>
    ),
  },
  {
    id: 'faq-2',
    pertanyaan: 'Di mana lokasi Bakorwil I Madiun?',
    jawaban: (
      <>
        <p className="pr-section__text">
          Kantor Bakorwil I Madiun beralamat di: <strong>Jl. Pahlawan No. 31, Kota Madiun,
          Jawa Timur.</strong>
        </p>
        <p className="pr-section__text">
          Wilayah kerja Bakorwil I Madiun meliputi:
        </p>
        <ol className="pr-misi-plain" style={{ margin: 0 }}>
          {[
            'Kota Madiun', 'Kabupaten Madiun', 'Kabupaten Magetan', 'Kabupaten Ngawi',
            'Kabupaten Ponorogo', 'Kabupaten Pacitan', 'Kabupaten Trenggalek',
            'Kabupaten Tulungagung', 'Kota Kediri', 'Kabupaten Kediri',
          ].map((w) => <li key={w} className="pr-misi-plain__item">{w}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-3',
    pertanyaan: 'Apa tugas dan fungsi Bakorwil I Madiun?',
    jawaban: (
      <>
        <p className="pr-section__text">
          Bakorwil I Madiun mempunyai tugas membantu Gubernur Jawa Timur dalam melaksanakan
          koordinasi penyelenggaraan pemerintahan di wilayah kerja.
        </p>
        <p className="pr-section__text">
          Adapun fungsi Bakorwil I Madiun antara lain:
        </p>
        <ol className="pr-misi-plain" style={{ margin: 0 }}>
          {[
            'Melaksanakan koordinasi penyelenggaraan pemerintahan daerah',
            'Memfasilitasi pelaksanaan program dan kebijakan Pemerintah Provinsi Jawa Timur di wilayah kerja',
            'Mendorong sinergi antar perangkat daerah, pemerintah kabupaten/kota, instansi vertikal, dan stakeholder lainnya',
            'Memantau serta mengevaluasi pelaksanaan pembangunan daerah',
            'Memfasilitasi penyelesaian berbagai permasalahan lintas sektor maupun lintas wilayah',
            'Mendukung peningkatan kualitas pelayanan publik dan kesejahteraan masyarakat',
          ].map((f) => <li key={f} className="pr-misi-plain__item">{f}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-4',
    pertanyaan: 'Bagaimana cara berkunjung ke Bakorwil I Madiun?',
    jawaban: (
      <>
        <p className="pr-section__text">Masyarakat dapat berkunjung ke Kantor Bakorwil I Madiun dengan langkah berikut:</p>
        <ol className="pr-misi-plain" style={{ margin: 0 }}>
          {[
            'Datang langsung ke Kantor Bakorwil I Madiun pada hari dan jam kerja',
            'Melapor kepada petugas keamanan (security) atau petugas layanan/front office',
            'Mengisi buku tamu atau melakukan registrasi sesuai prosedur yang berlaku',
            'Menyampaikan maksud dan tujuan kedatangan',
            'Petugas akan mengarahkan ke unit kerja atau pejabat yang berkepentingan',
          ].map((s) => <li key={s} className="pr-misi-plain__item">{s}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-5',
    pertanyaan: 'Bagaimana sejarah Bakorwil I Madiun?',
    jawaban: (
      <p className="pr-section__text" style={{ margin: 0 }}>
        Badan Koordinasi Wilayah (Bakorwil) dibentuk oleh Pemerintah Provinsi Jawa Timur
        sebagai upaya memperkuat koordinasi pemerintahan di tingkat wilayah. Keberadaan
        Bakorwil bertujuan mendekatkan fungsi koordinasi Pemerintah Provinsi kepada
        pemerintah kabupaten/kota sehingga pelaksanaan pembangunan, pelayanan publik,
        penanganan permasalahan strategis, serta sinkronisasi kebijakan dapat berjalan
        lebih efektif. Seiring perkembangan regulasi dan tata kelola pemerintahan, peran
        Bakorwil terus diperkuat sebagai fasilitator koordinasi, integrasi, sinkronisasi,
        serta pengendalian pelaksanaan kebijakan Pemerintah Provinsi Jawa Timur di wilayah
        kerjanya, yaitu Kota Madiun, Kabupaten Madiun, Kabupaten Magetan, Kabupaten Ngawi,
        Kabupaten Ponorogo, Kabupaten Pacitan, Kabupaten Trenggalek, Kabupaten Kediri,
        Kota Kediri, dan Kabupaten Tulungagung. Dengan semangat kolaborasi, Bakorwil I
        Madiun terus mendukung terwujudnya pemerintahan yang efektif, pelayanan publik
        yang prima, serta pembangunan daerah yang berkelanjutan.
      </p>
    ),
  },
];

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function LayananFaq() {
  // ── Video state (sama persis seperti di ProfilVisiMisi) ──
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
    <main className="pr-page" aria-label="FAQ — Pertanyaan yang Sering Diajukan">
      <div className="pr-page__inner">

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: header + FAQ (tiap jawaban dibungkus card) */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Frequently Asked Questions (FAQ)</h1>
              <div className="pr-header__bar" aria-hidden="true" />

              {/* Meta: badge + tanggal + views */}
              <div className="faq-meta" role="contentinfo" aria-label="Informasi dokumen">
                <span className="faq-meta__badge" aria-label="Kategori: PPID">PPID</span>
                <span className="faq-meta__dot" aria-hidden="true">·</span>
                <time className="faq-meta__date" dateTime="2026-04-12">12 Apr 2026</time>
                <span className="faq-meta__dot" aria-hidden="true">·</span>
                <span className="faq-meta__views" aria-label="156 kali dilihat">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  156
                </span>
              </div>
            </header>

            {FAQ_ITEMS.map((item) => (
              <section
                key={item.id}
                className="pr-section"
                aria-labelledby={`${item.id}-heading`}
              >
                <h2 className="pr-section__heading" id={`${item.id}-heading`}>
                  {item.pertanyaan}
                </h2>
                <div className="pr-info-card">
                  {item.jawaban}
                </div>
              </section>
            ))}
          </div>

          {/* Kolom kanan: sidebar banner (sama persis dengan Visi Misi) */}
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