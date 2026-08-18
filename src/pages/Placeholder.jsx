import { useLocation } from 'react-router-dom';
import './Placeholder.css';

// Peta path → nama halaman yang lebih ramah
const PAGE_NAMES = {
  '/berita': 'Berita',
  '/ejsc': 'EJSC',
  '/sakip-rb': 'SAKIP-RB',
  '/profil/sejarah': 'Sejarah',
  '/profil/visi-misi': 'Visi & Misi',
  '/profil/struktur-organisasi': 'Struktur Organisasi',
  '/profil/tugas-fungsi': 'Tugas & Fungsi',
  '/layanan/publik': 'Layanan Publik',
  '/layanan/pengaduan': 'Pengaduan',
  '/inovasi/daftar': 'Daftar Inovasi',
  '/inovasi/ajukan': 'Ajukan Inovasi',
  // PPID
  '/ppid/profil': 'Profil PPID',
  '/ppid/layanan-informasi': 'Layanan Informasi',
  '/ppid/dokumen/sk-ppid':                    'SK PPID',
  '/ppid/dokumen/dip/bakorwil-1-madiun':      'DIP PPID Bakorwil I Madiun',
  '/ppid/dokumen/llid/bakorwil-1-madiun':     'LLID PPID Bakorwil I Madiun',
};

export default function Placeholder() {
  const { pathname } = useLocation();
  const name = PAGE_NAMES[pathname] ?? 'Halaman Ini';

  return (
    <main className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">🚧</div>
        <h1 className="placeholder-title">{name}</h1>
        <p className="placeholder-text">Halaman sedang dalam pengembangan.</p>
        <p className="placeholder-sub">Silakan kembali lagi nanti.</p>
      </div>
    </main>
  );
}
