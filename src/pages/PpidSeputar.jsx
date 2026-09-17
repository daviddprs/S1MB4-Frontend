import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';

export default function PpidSeputar() {
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
    <main className="pr-page" aria-label="Seputar PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">
                Seputar Pejabat Pengelola Informasi dan Dokumentasi (PPID)
              </h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ═══════════════════════════════════════════
                SECTION 1 — Pengantar & Klasifikasi
            ═══════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-pengantar">
              <div className="pr-info-card">

                <p className="pr-section__text">
                  Pejabat Pengelola Informasi dan Dokumentasi (PPID) merupakan pejabat yang
                  bertugas mengelola, menyimpan, mendokumentasikan, menyediakan, dan memberikan
                  pelayanan informasi publik pada badan publik. Keberadaan PPID menjadi wujud
                  pelaksanaan amanat Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan
                  Informasi Publik, yang menjamin hak setiap orang untuk memperoleh informasi
                  secara mudah, cepat, dan melalui satu pintu pelayanan.
                </p>

                <p className="pr-section__text">
                  Di lingkungan Pemerintah Provinsi Jawa Timur, termasuk di Bakorwil I Madiun,
                  PPID berperan penting dalam memastikan setiap informasi yang terbuka dapat
                  diakses masyarakat. Selain itu, PPID juga mengoordinasikan pengumpulan bahan
                  informasi, melakukan verifikasi, memperbarui data, serta menginventarisasi
                  informasi yang dikecualikan. PPID Pembantu di masing-masing bidang atau unit
                  kerja membantu pelaksanaan fungsi ini pada lingkupnya masing-masing.
                </p>

                <p className="pr-section__text">
                  Informasi Publik adalah segala keterangan yang dihasilkan, disimpan, atau
                  dikelola oleh badan publik dan berkaitan dengan penyelenggaraan pemerintahan
                  maupun kepentingan masyarakat luas. Berdasarkan peraturan, informasi publik
                  diklasifikasikan menjadi:
                </p>

                <ol className="pr-misi-plain" aria-label="Klasifikasi Informasi Publik">
                  <li className="pr-misi-plain__item">Informasi yang wajib diumumkan secara berkala</li>
                  <li className="pr-misi-plain__item">Informasi yang wajib diumumkan secara serta merta</li>
                  <li className="pr-misi-plain__item">Informasi yang wajib tersedia setiap saat</li>
                  <li className="pr-misi-plain__item">Informasi yang dikecualikan</li>
                </ol>

                <p className="pr-section__text" style={{ marginTop: '16px' }}>
                  Badan Publik sendiri mencakup lembaga eksekutif, legislatif, yudikatif,
                  maupun organisasi lain yang menjalankan fungsi penyelenggaraan negara dan
                  dibiayai sebagian atau seluruhnya oleh APBN/APBD, sumbangan masyarakat,
                  atau dana luar negeri.
                </p>

                <p className="pr-section__text">
                  Sesuai ketentuan Undang-Undang dan Peraturan Komisi Informasi, setiap badan
                  publik wajib menyediakan informasi publik yang akurat, benar, dan tidak
                  menyesatkan, membangun sistem informasi yang efektif, serta menyediakan
                  sarana dan prasarana layanan informasi yang memadai. Bakorwil I Madiun
                  berkomitmen melaksanakan kewajiban tersebut, baik melalui layanan tatap muka,
                  sarana informasi fisik, maupun media daring yang dapat diakses masyarakat.
                </p>

              </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 2 — Kewajiban Badan Publik
            ═══════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-kewajiban">
              <h2 className="pr-section__heading" id="heading-kewajiban">
                KEWAJIBAN BADAN PUBLIK
              </h2>

              {/* Satu pr-info-card berisi dua sub-bagian dengan divider — pola
                  sama seperti card Kedudukan + Alamat di ProfilKedudukanAlamat */}
              <div className="pr-info-card">

                {/* Sub-bagian 1: Pasal 7 UU 14/2008 */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Pasal 7 UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
                </h3>
                <ol className="pr-misi-plain" aria-label="Pasal 7 UU Nomor 14 Tahun 2008">
                  <li className="pr-misi-plain__item">
                    Badan Publik wajib menyediakan, memberikan dan/atau menerbitkan Informasi
                    Publik yang berada di bawah kewenangannya kepada Pemohon Informasi Publik,
                    selain informasi yang dikecualikan sesuai dengan ketentuan
                  </li>
                  <li className="pr-misi-plain__item">
                    Badan Publik wajib menyediakan Informasi Publik yang akurat, benar, dan
                    tidak menyesatkan
                  </li>
                  <li className="pr-misi-plain__item">
                    Untuk melaksanakan kewajiban sebagaimana dimaksud pada angka 2, Badan
                    Publik harus membangun dan mengembangkan sistem informasi dan dokumentasi
                    untuk mengelola Informasi Publik secara baik dan efisien sehingga dapat
                    diakses dengan mudah
                  </li>
                  <li className="pr-misi-plain__item">
                    Badan Publik wajib membuat pertimbangan secara tertulis setiap kebijakan
                    yang diambil untuk memenuhi hak setiap orang atas Informasi Publik
                  </li>
                  <li className="pr-misi-plain__item">
                    Pertimbangan sebagaimana dimaksud pada angka 4, antara lain memuat
                    pertimbangan politik, ekonomi, sosial, budaya, dan/atau pertahanan dan
                    keamanan Negara
                  </li>
                  <li className="pr-misi-plain__item">
                    Dalam rangka memenuhi kewajiban sebagaimana dimaksud pada angka 1 sampai
                    dengan angka 4, Badan Publik dapat memanfaatkan sarana dan/atau media
                    elektronik dan nonelektronik
                  </li>
                </ol>

                <hr className="pr-card-divider" />

                {/* Sub-bagian 2: Pasal 4 PERKI 1/2010 */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Pasal 4 PERKI No. 1 Th. 2010 tentang Standar Layanan Informasi Publik
                </h3>
                <ol className="pr-misi-plain" aria-label="Pasal 4 PERKI Nomor 1 Tahun 2010">
                  <li className="pr-misi-plain__item">
                    Menetapkan peraturan mengenai standar prosedur operasional layanan
                    Informasi Publik
                  </li>
                  <li className="pr-misi-plain__item">
                    Membangun dan mengembangkan sistem informasi dan dokumentasi untuk
                    mengelola Informasi Publik secara baik dan efisien
                  </li>
                  <li className="pr-misi-plain__item">
                    Menunjuk dan mengangkat PPID untuk melaksanakan tugas dan tanggung jawab
                    serta wewenangnya
                  </li>
                  <li className="pr-misi-plain__item">
                    Menganggarkan pembiayaan secara memadai bagi layanan Informasi Publik
                    sesuai dengan peraturan perundang-undangan yang berlaku
                  </li>
                  <li className="pr-misi-plain__item">
                    Menyediakan sarana dan prasarana layanan Informasi Publik, termasuk papan
                    pengumuman dan meja informasi di setiap kantor Badan Publik, serta situs
                    resmi bagi Badan Publik Negara
                  </li>
                  <li className="pr-misi-plain__item">
                    Menetapkan standar biaya perolehan salinan Informasi Publik
                  </li>
                  <li className="pr-misi-plain__item">
                    Menetapkan dan memutakhirkan secara berkala Daftar Informasi Publik atas
                    seluruh Informasi Publik yang dikelola
                  </li>
                  <li className="pr-misi-plain__item">
                    Menyediakan dan memberikan Informasi Publik
                  </li>
                  <li className="pr-misi-plain__item">
                    Memberikan tanggapan atas keberatan yang diajukan oleh Pemohon Informasi
                    Publik yang mengajukan keberatan
                  </li>
                  <li className="pr-misi-plain__item">
                    Membuat dan mengumumkan laporan tentang layanan Informasi Publik sesuai
                    dengan Peraturan ini serta menyampaikan salinan laporan kepada Komisi
                    Informasi
                  </li>
                  <li className="pr-misi-plain__item">
                    Melakukan evaluasi dan pengawasan terhadap pelaksanaan layanan Informasi
                    Publik pada instansinya
                  </li>
                </ol>

              </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 3 — Jenis Informasi Publik
            ═══════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-jenis">
              <h2 className="pr-section__heading" id="heading-jenis">
                JENIS INFORMASI PUBLIK
              </h2>
              <div className="pr-info-card">
                <ol className="pr-misi-plain" aria-label="Jenis Informasi Publik">
                  <li className="pr-misi-plain__item">
                    <strong>Informasi yang wajib disediakan dan diumumkan secara berkala</strong>{' '}
                    adalah informasi yang telah dikuasai dan didokumentasikan oleh Badan Publik
                    untuk diumumkan secara teratur dan rutin tanpa ada permintaan
                  </li>
                  <li className="pr-misi-plain__item">
                    <strong>Informasi yang wajib diumumkan secara serta merta</strong> adalah
                    informasi yang apabila tidak disampaikan dapat mengancam hajat hidup orang
                    banyak dan ketertiban umum yang berhubungan dengan tupoksi Badan Publik
                    tanpa ada permintaan
                  </li>
                  <li className="pr-misi-plain__item">
                    <strong>Informasi yang wajib tersedia setiap saat</strong> adalah informasi
                    yang telah dikuasai dan didokumentasikan oleh Badan Publik serta telah
                    dinyatakan terbuka sebagai informasi yang dapat diakses oleh pengguna
                    informasi bilamana ada permintaan
                  </li>
                  <li className="pr-misi-plain__item">
                    <strong>Informasi yang dikecualikan</strong> adalah informasi yang dikuasai
                    dan didokumentasikan oleh Badan Publik yang tidak dapat diakses oleh
                    pemohon informasi berdasarkan alasan-alasan pengecualian
                  </li>
                </ol>
              </div>
            </section>

          </div>

          {/* ── Kolom kanan: sidebar (reuse banner + video) ── */}
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
