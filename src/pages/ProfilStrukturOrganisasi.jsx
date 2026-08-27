import './Profil.css';

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
  return (
    <main className="pr-page" aria-label="Struktur Organisasi Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Struktur Organisasi</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Susunan organisasi Bakorwil I Madiun berdasarkan Peraturan Gubernur Jawa Timur
            Nomor 134 Tahun 2016.
          </p>
        </header>

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: konten */}
          <div className="pr-content">

            {/* Intro */}
            <p className="pr-org-intro">{INTRO}</p>

            {/* Daftar organisasi */}
            <section aria-labelledby="heading-org-list">
              <h2 className="pr-section__heading" id="heading-org-list"
                style={{ marginBottom: '16px' }}>
                SUSUNAN ORGANISASI
              </h2>
              <ol className="pr-org-list" aria-label="Susunan organisasi Bakorwil I Madiun">
                {ORGANISASI.map((item, idx) => (
                  <li key={idx} className="pr-org-item">
                    <span className="pr-org-item__num" aria-hidden="true">{idx + 1}</span>
                    <div className="pr-org-item__body">
                      <p className="pr-org-item__name">{item.nama}</p>
                      {item.sub && (
                        <p className="pr-org-item__sub">
                          membawahi: {item.sub}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Closing text */}
            <p className="pr-org-closing" style={{ marginTop: '24px' }}>{CLOSING}</p>

          </div>

          {/* Kolom kanan: gambar */}
          <aside className="pr-sidebar" aria-label="Informasi tambahan">
            <img
              src="/logo-bakorwil.png"
              alt="Logo Bakorwil I Madiun"
              className="pr-sidebar__img"
              loading="lazy"
              style={{ padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 14px rgba(13,154,166,0.08)' }}
            />
            <div className="pr-info-card" style={{ marginTop: '20px' }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#5e8694', lineHeight: 1.6 }}>
                <strong style={{ color: '#1e3540' }}>Dasar Hukum:</strong><br />
                Peraturan Gubernur Jawa Timur Nomor 134 Tahun 2016 Tentang Kedudukan,
                Susunan Organisasi, Uraian Tugas dan Fungsi Serta Tata Kerja Badan
                Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur.
              </p>
            </div>
          </aside>

        </div>

        {/* ── Bagan struktur organisasi ── */}
        <section aria-labelledby="heading-bagan" style={{ marginTop: '8px' }}>
          <h2 className="pr-section__heading" id="heading-bagan">BAGAN STRUKTUR ORGANISASI</h2>
          {/*
            Ganti div placeholder di bawah ini dengan:
            <img src={baganSrc} alt="Bagan Struktur Organisasi Bakorwil I Madiun"
                 className="pr-org-chart-img" loading="lazy" />
            setelah file gambar tersedia di src/assets/.
          */}
          <div className="pr-org-chart-placeholder" role="img"
            aria-label="Area bagan struktur organisasi — gambar belum tersedia">
            <div className="pr-org-chart-placeholder__icon" aria-hidden="true">🏛️</div>
            <p className="pr-org-chart-placeholder__title">Bagan Struktur Organisasi</p>
            <p className="pr-org-chart-placeholder__sub">
              Gambar bagan akan ditampilkan di sini setelah file tersedia.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
