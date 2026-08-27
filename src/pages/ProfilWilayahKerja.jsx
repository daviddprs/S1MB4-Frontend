import './Profil.css';

/* ── 8 daerah wilayah kerja Bakorwil I Madiun ── */
const WILAYAH = [
  { nama: 'KAB. KEDIRI',    logo: new URL('../assets/lambang-kediri.png',       import.meta.url).href },
  { nama: 'KOTA KEDIRI',    logo: new URL('../assets/lambang-kota-kediri.png',  import.meta.url).href },
  { nama: 'KAB. MADIUN',    logo: new URL('../assets/lambang-madiun.png',       import.meta.url).href },
  { nama: 'KOTA MADIUN',    logo: new URL('../assets/lambang-kota-madiun.png',  import.meta.url).href },
  { nama: 'KAB. NGAWI',     logo: new URL('../assets/lambang-ngawi.png',        import.meta.url).href },
  { nama: 'KAB. MAGETAN',   logo: new URL('../assets/lambang-magetan.png',      import.meta.url).href },
  { nama: 'KAB. PONOROGO',  logo: new URL('../assets/lambang-ponorogo.png',     import.meta.url).href },
  { nama: 'KAB. PACITAN',   logo: new URL('../assets/lambang-pacitan.png',      import.meta.url).href },
];

export default function ProfilWilayahKerja() {
  return (
    <main className="pr-page" aria-label="Wilayah Kerja Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Wilayah Kerja Bakorwil I Madiun</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Bakorwil I Madiun memiliki wilayah kerja yang mencakup 8 (delapan)
            kabupaten/kota di wilayah barat daya Provinsi Jawa Timur.
          </p>
        </header>

        {/* ── Grid wilayah ── */}
        <section aria-labelledby="heading-wilayah">
          <h2 className="pr-section__heading" id="heading-wilayah"
            style={{ marginBottom: '24px' }}>
            DAERAH WILAYAH KERJA
          </h2>

          <div className="pr-wilayah-grid" role="list"
            aria-label="Daftar kabupaten/kota wilayah kerja Bakorwil I Madiun">
            {WILAYAH.map((daerah) => (
              <div key={daerah.nama} className="pr-wilayah-card" role="listitem">
                <img
                  src={daerah.logo}
                  alt={`Lambang ${daerah.nama}`}
                  className="pr-wilayah-card__logo"
                  loading="lazy"
                  width="80"
                  height="80"
                />
                <p className="pr-wilayah-card__name">{daerah.nama}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
