import { useState, useEffect } from 'react';
import { fetchJson } from '../lib/api';
import { Sidebar } from '../components/BeritaTerbaru/BeritaTerbaruSection';
import '../components/BeritaTerbaru/BeritaTerbaruSection.css';
import './Profil.css';
import permohonanSrc from '../assets/permohonan-informasi.jpg';

export default function PpidLayananInformasi() {
  const [videos, setVideos]         = useState([]);
  const [videoLoading, setVLoading] = useState(true);
  const [videoError, setVError]     = useState(null);
  const [imgError, setImgError]     = useState(false);

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
    <main className="pr-page" aria-label="Layanan Informasi PPID Bakorwil I Madiun">
      <div className="pr-page__inner">
        <div className="pr-layout">

          {/* ── Kolom kiri: konten ── */}
          <div className="pr-content">

            {/* ── Page header ── */}
            <header className="pr-header">
              <h1 className="pr-header__title">Permohonan Informasi Publik</h1>
              <div className="pr-header__bar" aria-hidden="true" />
            </header>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 1 — Mekanisme Permohonan Informasi Publik
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-mekanisme">
              <h2 className="pr-section__heading" id="heading-mekanisme">
                MEKANISME PERMOHONAN INFORMASI PUBLIK
              </h2>

              <div className="pr-info-card">

                {/* ── Sub-bagian 1: Pengajuan Permohonan ── */}
                <h3 className="pr-info-card__name pr-card-subheading">
                  Permohonan Informasi Datang Langsung
                </h3>

                {/* Nomor 1 */}
                <p className="pr-layanan-step-label">1. Pengajuan Permohonan</p>
                <ul className="pr-contact-list">
                  <li className="pr-contact-list__item">
                    Pemohon datang ke Meja Layanan Informasi PPID Bakorwil I Madiun.
                  </li>
                  <li className="pr-contact-list__item">
                    Mengisi Formulir Permintaan Informasi Publik dan melampirkan:
                    <ul className="pr-contact-list pr-contact-list--nested">
                      <li className="pr-contact-list__item">
                        Fotokopi KTP pemohon dan/atau pengguna informasi.
                      </li>
                      <li className="pr-contact-list__item">
                        Bagi lembaga publik/ormas: fotokopi akta pendirian, surat keterangan
                        terdaftar di Bakesbangpol Provinsi Jawa Timur/setempat, dan surat
                        keterangan domisili.
                      </li>
                    </ul>
                  </li>
                  <li className="pr-contact-list__item">
                    Menyampaikan maksud dan tujuan penggunaan informasi secara jelas.
                  </li>
                  <li className="pr-contact-list__item">
                    Petugas memberikan tanda bukti penerimaan permintaan kepada pemohon.
                  </li>
                </ul>

                {/* Nomor 2 */}
                <p className="pr-layanan-step-label">2. Proses Verifikasi dan Penyampaian Informasi</p>
                <ul className="pr-contact-list">
                  <li className="pr-contact-list__item">
                    Petugas memproses permohonan sesuai formulir yang telah ditandatangani pemohon.
                  </li>
                  <li className="pr-contact-list__item">
                    Informasi diberikan sesuai permintaan, kecuali jika termasuk informasi yang
                    dikecualikan sesuai ketentuan perundang-undangan, disertai alasan tertulis penolakan.
                  </li>
                  <li className="pr-contact-list__item">
                    Pemohon menerima tanda bukti penyerahan informasi publik.
                  </li>
                  <li className="pr-contact-list__item">
                    Semua proses dicatat dan dibukukan oleh petugas PPID.
                  </li>
                </ul>

                {/* Nomor 3 */}
                <p className="pr-layanan-step-label">3. Jangka Waktu Penyelesaian</p>
                <ul className="pr-contact-list">
                  <li className="pr-contact-list__item">
                    Permohonan diproses setelah semua persyaratan terpenuhi.
                  </li>
                  <li className="pr-contact-list__item">
                    Paling lambat <strong>10 (sepuluh) hari kerja</strong> sejak permohonan diterima,
                    PPID akan memberikan pemberitahuan terkait ketersediaan informasi.
                  </li>
                  <li className="pr-contact-list__item">
                    Jika diperlukan, PPID dapat memperpanjang waktu maksimal{' '}
                    <strong>7 (tujuh) hari kerja</strong>.
                  </li>
                  <li className="pr-contact-list__item">
                    Penyerahan informasi dilakukan secara langsung dengan penandatanganan berita
                    acara penerimaan.
                  </li>
                  <li className="pr-contact-list__item">
                    Surat pemberitahuan mencantumkan: materi informasi yang diberikan, format
                    informasi (softcopy atau hardcopy), biaya penggandaan menjadi tanggung jawab
                    pemohon.
                  </li>
                  <li className="pr-contact-list__item">
                    Jika permohonan ditolak, surat pemberitahuan memuat alasan penolakan sesuai UU KIP.
                  </li>
                </ul>

                {/* Nomor 4 */}
                <p className="pr-layanan-step-label">4. Biaya/Tarif</p>
                <ul className="pr-contact-list">
                  <li className="pr-contact-list__item">
                    Layanan informasi publik <strong>gratis</strong>.
                  </li>
                  <li className="pr-contact-list__item">
                    Biaya penggandaan/fotokopi ditanggung oleh pemohon, baik dilakukan sendiri
                    maupun melalui penyedia jasa di sekitar gedung Bakorwil I Madiun.
                  </li>
                </ul>

              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 2 — Permohonan Informasi Online
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-online">
              <h2 className="pr-section__heading" id="heading-online">
                PERMOHONAN INFORMASI ONLINE
              </h2>

              <div className="pr-info-card">
                <ol className="pr-misi-plain" aria-label="Prosedur Permohonan Informasi Online">
                  <li className="pr-misi-plain__item">
                    Setiap Pemohon Informasi Publik dapat mengajukan permohonan untuk mendapatkan
                    Informasi Publik kepada Badan Koordinasi Wilayah (Bakorwil) Madiun, baik
                    secara tertulis maupun tidak tertulis, secara langsung atau melalui surat
                    elektronik.
                  </li>
                  <li className="pr-misi-plain__item">
                    Bakorwil I Madiun akan mencatat identitas Pemohon Informasi Publik. Identitas
                    tersebut mencakup nama, alamat, subjek dan format informasi yang diminta, serta
                    metode penyampaian informasi yang diinginkan. Hal ini berlaku baik untuk
                    permintaan tertulis maupun tidak tertulis.
                  </li>
                  <li className="pr-misi-plain__item">
                    Bakorwil I Madiun akan memberikan bukti penerimaan permintaan Informasi Publik
                    dalam bentuk nomor pendaftaran pada saat permohonan diterima.
                  </li>
                  <li className="pr-misi-plain__item">
                    Dalam waktu paling lambat <strong>10 (sepuluh) hari kerja</strong> sejak
                    permohonan diterima, Bakorwil I Madiun akan memberikan pemberitahuan tertulis
                    yang berisikan:
                    <ul className="pr-contact-list pr-contact-list--nested" style={{ marginTop: '8px' }}>
                      <li className="pr-contact-list__item">
                        Apakah informasi yang diminta berada di bawah penguasaan Bakorwil I Madiun
                        atau tidak. Jika informasi tersebut tidak berada di bawah penguasaan
                        Bakorwil I Madiun namun Bakorwil mengetahui keberadaan informasi tersebut,
                        maka Bakorwil akan memberitahukan Badan Publik yang menguasai informasi
                        yang diminta.
                      </li>
                      <li className="pr-contact-list__item">
                        Penerimaan atau penolakan permintaan. Permintaan akan ditolak jika
                        informasi yang diminta termasuk dalam kategori informasi yang dikecualikan
                        (dirahasiakan).
                      </li>
                      <li className="pr-contact-list__item">
                        Status informasi yang diminta, apakah akan diberikan secara keseluruhan
                        atau sebagian, tergantung pada status informasi tersebut
                        (dikecualikan/dirahasiakan atau dapat diakses oleh publik).
                      </li>
                      <li className="pr-contact-list__item">
                        Alat penyampaian dan format informasi yang akan diberikan.
                      </li>
                    </ul>
                  </li>
                  <li className="pr-misi-plain__item">
                    Bakorwil I Madiun dapat memperpanjang waktu untuk mengirimkan pemberitahuan
                    sesuai dengan ketentuan yang berlaku, dengan memberikan alasan secara tertulis,
                    paling lambat <strong>7 (tujuh) hari kerja</strong> berikutnya.
                  </li>
                </ol>

                <p className="pr-section__text" style={{ marginTop: '20px' }}>
                  Untuk mengajukan Permohonan Informasi Publik secara online, silakan klik
                  tautan berikut:{' '}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdjARkpV_wyMvu7UIb9v4xrg6HrUlKerGF5Pvy7MhBbP6uxAQ/viewform"
                    className="pr-layanan-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Form Permohonan Informasi Publik Secara Online (Google Form)"
                  >
                    Form Permohonan Informasi Publik Secara Online
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTION 3 — Banner Alur Permohonan (gambar statis)
            ════════════════════════════════════════════════════════════ */}
            <section className="pr-section" aria-labelledby="heading-alur">
              <h2 className="pr-section__heading" id="heading-alur">
                ALUR PERMOHONAN INFORMASI BAKORWIL I MADIUN
              </h2>

              {/*
                File permohonan-informasi.jpg sudah ada di src/assets/.
                Ditampilkan sebagai gambar statis biasa tanpa lightbox.
              */}
              <div className="pr-layanan-img-wrap">
                {imgError ? (
                  <div className="pr-layanan-img-placeholder" role="img"
                    aria-label="Gambar alur permohonan informasi gagal dimuat">
                    <div className="pr-layanan-img-placeholder__icon" aria-hidden="true">🗂️</div>
                    <p className="pr-layanan-img-placeholder__title">Alur Permohonan Informasi</p>
                    <p className="pr-layanan-img-placeholder__sub">
                      Gambar tidak dapat dimuat. Silakan muat ulang halaman.
                    </p>
                  </div>
                ) : (
                  <img
                    src={permohonanSrc}
                    alt="Alur Permohonan Informasi Bakorwil I Madiun"
                    className="pr-layanan-img"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </section>

          </div>

          {/* ── Kolom kanan: sidebar reuse dari halaman Profil lainnya ── */}
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
