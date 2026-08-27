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
  return (
    <main className="pr-page" aria-label="Visi dan Misi Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Visi Dan Misi</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Visi dan Misi Badan Koordinasi Wilayah Pemerintahan dan Pembangunan
            Provinsi Jawa Timur di Madiun.
          </p>
        </header>

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: konten */}
          <div className="pr-content">

            {/* VISI */}
            <section className="pr-section" aria-labelledby="heading-visi">
              <h2 className="pr-section__heading" id="heading-visi">VISI</h2>
              <div className="pr-visi-box">
                <p className="pr-visi-box__label" aria-hidden="true">Visi</p>
                <p className="pr-visi-box__text">"{VISI}"</p>
              </div>
            </section>

            {/* MISI */}
            <section className="pr-section" aria-labelledby="heading-misi">
              <h2 className="pr-section__heading" id="heading-misi">MISI</h2>
              <ol className="pr-misi-list" aria-label="Daftar Misi">
                {MISI.map((teks, idx) => (
                  <li key={idx} className="pr-misi-item">
                    <span className="pr-misi-item__num" aria-hidden="true">
                      {idx + 1}
                    </span>
                    <p className="pr-misi-item__text">{teks}</p>
                  </li>
                ))}
              </ol>
            </section>

          </div>

          {/* Kolom kanan: gambar */}
          <aside className="pr-sidebar" aria-label="Gambar Bakorwil I Madiun">
            <img
              src="/logo-bakorwil.png"
              alt="Logo Bakorwil I Madiun"
              className="pr-sidebar__img"
              loading="lazy"
              style={{ padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 14px rgba(13,154,166,0.08)' }}
            />
            <div className="pr-info-card" style={{ marginTop: '20px' }}>
              <p className="pr-section__text" style={{ margin: 0, fontSize: '0.85rem', color: '#5e8694', textAlign: 'center', fontStyle: 'italic' }}>
                Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur di Madiun
              </p>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
