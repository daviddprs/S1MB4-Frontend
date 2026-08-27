import { useState } from 'react';
import './Profil.css';

/* ══════════════════════════════════════════════
   DATA FAQ — hardcoded (statis, tidak perlu DB)
══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    id: 'faq-1',
    pertanyaan: 'Apa itu Bakorwil I Madiun?',
    jawaban: (
      <p>
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
        <p>
          Kantor Bakorwil I Madiun beralamat di: <strong>Jl. Pahlawan No. 31, Kota Madiun,
          Jawa Timur.</strong>
        </p>
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>
          Wilayah kerja Bakorwil I Madiun meliputi:
        </p>
        <ol style={{ margin: '0 0 0 18px', paddingLeft: 0, lineHeight: 2 }}>
          {[
            'Kota Madiun', 'Kabupaten Madiun', 'Kabupaten Magetan', 'Kabupaten Ngawi',
            'Kabupaten Ponorogo', 'Kabupaten Pacitan', 'Kabupaten Trenggalek',
            'Kabupaten Tulungagung', 'Kota Kediri', 'Kabupaten Kediri',
          ].map((w) => <li key={w}>{w}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-3',
    pertanyaan: 'Apa tugas dan fungsi Bakorwil I Madiun?',
    jawaban: (
      <>
        <p>
          Bakorwil I Madiun mempunyai tugas membantu Gubernur Jawa Timur dalam melaksanakan
          koordinasi penyelenggaraan pemerintahan di wilayah kerja.
        </p>
        <p style={{ marginTop: '8px', marginBottom: '8px' }}>
          Adapun fungsi Bakorwil I Madiun antara lain:
        </p>
        <ol style={{ margin: '0 0 0 18px', paddingLeft: 0, lineHeight: 2 }}>
          {[
            'Melaksanakan koordinasi penyelenggaraan pemerintahan daerah',
            'Memfasilitasi pelaksanaan program dan kebijakan Pemerintah Provinsi Jawa Timur di wilayah kerja',
            'Mendorong sinergi antar perangkat daerah, pemerintah kabupaten/kota, instansi vertikal, dan stakeholder lainnya',
            'Memantau serta mengevaluasi pelaksanaan pembangunan daerah',
            'Memfasilitasi penyelesaian berbagai permasalahan lintas sektor maupun lintas wilayah',
            'Mendukung peningkatan kualitas pelayanan publik dan kesejahteraan masyarakat',
          ].map((f) => <li key={f}>{f}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-4',
    pertanyaan: 'Bagaimana cara berkunjung ke Bakorwil I Madiun?',
    jawaban: (
      <>
        <p>Masyarakat dapat berkunjung ke Kantor Bakorwil I Madiun dengan langkah berikut:</p>
        <ol style={{ margin: '8px 0 0 18px', paddingLeft: 0, lineHeight: 2 }}>
          {[
            'Datang langsung ke Kantor Bakorwil I Madiun pada hari dan jam kerja',
            'Melapor kepada petugas keamanan (security) atau petugas layanan/front office',
            'Mengisi buku tamu atau melakukan registrasi sesuai prosedur yang berlaku',
            'Menyampaikan maksud dan tujuan kedatangan',
            'Petugas akan mengarahkan ke unit kerja atau pejabat yang berkepentingan',
          ].map((s) => <li key={s}>{s}</li>)}
        </ol>
      </>
    ),
  },
  {
    id: 'faq-5',
    pertanyaan: 'Bagaimana sejarah Bakorwil I Madiun?',
    jawaban: (
      <p>
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
   ACCORDION ITEM
══════════════════════════════════════════════ */
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        id={`${item.id}-btn`}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
        type="button"
      >
        <span className="faq-item__q">{item.pertanyaan}</span>
        <span className="faq-item__chevron" aria-hidden="true">›</span>
      </button>
      <div
        className="faq-item__panel"
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-btn`}
        hidden={!isOpen}
      >
        <div className="faq-item__answer">
          {item.jawaban}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function LayananFaq() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id); // buka item pertama by default

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <main className="pr-page" aria-label="FAQ — Pertanyaan yang Sering Diajukan">
      <div className="pr-page__inner">

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

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: FAQ accordion */}
          <div className="pr-content">
            <section aria-label="Daftar pertanyaan yang sering diajukan">
              <div className="faq-list" role="list">
                {FAQ_ITEMS.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Kolom kanan */}
          <aside className="pr-sidebar" aria-label="Kontak dan informasi tambahan">
            <img
              src="/logo-bakorwil.png"
              alt="Logo Bakorwil I Madiun"
              className="pr-sidebar__img"
              loading="lazy"
              style={{ padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 14px rgba(13,154,166,0.08)' }}
            />
            <div className="pr-info-card" style={{ marginTop: '20px' }}>
              <p className="pr-section__heading" style={{ marginBottom: '10px' }}>
                ADA PERTANYAAN LAIN?
              </p>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#5e8694', lineHeight: 1.7, fontFamily: 'Inter, system-ui, sans-serif' }}>
                Silakan hubungi kami melalui:
              </p>
              <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', fontSize: '0.84rem', color: '#5e8694', fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.9 }}>
                <li>📍 Jl. Pahlawan No. 31, Kota Madiun</li>
                <li>📞 <a href="tel:0351464151" style={{ color: '#0d9aa6', textDecoration: 'none' }}>(0351) 464151</a></li>
                <li>✉️ <a href="mailto:bakorwilmadiun@jatimprov.go.id" style={{ color: '#0d9aa6', textDecoration: 'none', wordBreak: 'break-all' }}>bakorwilmadiun@jatimprov.go.id</a></li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
