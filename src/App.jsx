import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import Berita from './pages/Berita';
import SakipRb from './pages/SakipRb';
import ProfilVisiMisi from './pages/ProfilVisiMisi';
import ProfilTugasFungsi from './pages/ProfilTugasFungsi';
import ProfilKedudukanAlamat from './pages/ProfilKedudukanAlamat';
import ProfilStrukturOrganisasi from './pages/ProfilStrukturOrganisasi';
import ProfilWilayahKerja from './pages/ProfilWilayahKerja';
import ProfilPejabatStruktural from './pages/ProfilPejabatStruktural';
import ProfilLhkpnLhkan from './pages/ProfilLhkpnLhkan';
import Ejsc from './pages/Ejsc';
import LayananBafastForm from './pages/LayananBafastForm';
import LayananFaq from './pages/LayananFaq';
import LayananJadwal from './pages/LayananJadwal';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Catatan: semua halaman /ppid/* telah dipindah ke project PPID-Frontend (localhost:5174)
// Menu "PPID" di Navbar kini menjadi link luar ke project tersebut.

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Halaman Profil */}
        <Route path="/profil/visi-misi"           element={<ProfilVisiMisi />} />
        <Route path="/profil/tugas-fungsi"         element={<ProfilTugasFungsi />} />
        <Route path="/profil/kedudukan-alamat"    element={<ProfilKedudukanAlamat />} />
        <Route path="/profil/struktur-organisasi" element={<ProfilStrukturOrganisasi />} />
        <Route path="/profil/wilayah-kerja"       element={<ProfilWilayahKerja />} />
        <Route path="/profil/pejabat-struktural"  element={<ProfilPejabatStruktural />} />
        <Route path="/profil/lhkpn-lhkan"         element={<ProfilLhkpnLhkan />} />
        {/* Catch-all untuk sub-halaman profil yang belum diimplementasikan (mis. /profil/sejarah) */}
        <Route path="/profil/*"                   element={<Placeholder />} />

        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<Berita />} />
        <Route path="/ejsc" element={<Ejsc />} />

        {/* Halaman Layanan */}
        <Route path="/layanan/jadwal-kegiatan" element={<LayananJadwal />} />
        <Route path="/layanan/bafast-form"     element={<LayananBafastForm />} />
        <Route path="/layanan/faq"             element={<LayananFaq />} />
        <Route path="/layanan/*"               element={<Placeholder />} />

        <Route path="/sakip-rb" element={<SakipRb />} />
        <Route path="/inovasi/*" element={<Placeholder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
