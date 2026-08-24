import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import PpidBerkala from './pages/PpidBerkala';
import PpidDikecualikan from './pages/PpidDikecualikan';
import PpidSertaMerta from './pages/PpidSertaMerta';
import PpidSetiapSaat from './pages/PpidSetiapSaat';
import PpidLaporanAkses from './pages/PpidLaporanAkses';
import Placeholder from './pages/Placeholder';
import PpidSimplePage from './pages/PpidSimplePage';
import Berita from './pages/Berita';
import SakipRb from './pages/SakipRb';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* PPID */}
        <Route path="/ppid/berkala" element={<PpidBerkala />} />
        <Route path="/ppid/dikecualikan" element={<PpidDikecualikan />} />
        <Route path="/ppid/serta-merta" element={<PpidSertaMerta />} />
        <Route path="/ppid/setiap-saat" element={<PpidSetiapSaat />} />
        <Route path="/ppid/laporan-akses-informasi" element={<PpidLaporanAkses />} />
        <Route path="/ppid/profil" element={<Placeholder />} />
        <Route path="/ppid/layanan-informasi" element={<Placeholder />} />
        {/* Dokumen PPID — live data dari API */}
        <Route
          path="/ppid/dokumen/sk-ppid"
          element={<PpidSimplePage title="SK PPID" endpoint="/ppid/dokumen/sk-ppid" />}
        />
        <Route
          path="/ppid/dokumen/dip/bakorwil-1-madiun"
          element={<PpidSimplePage title="DIP PPID Bakorwil I Madiun" endpoint="/ppid/dokumen/dip-bakorwil-1-madiun" />}
        />
        {/* LLID — live data dari API */}
        <Route
          path="/ppid/dokumen/llid/bakorwil-1-madiun"
          element={<PpidSimplePage title="LLID PPID Bakorwil I Madiun" endpoint="/ppid/dokumen/llid-bakorwil-1-madiun" />}
        />
        {/* Catch-all untuk path dokumen lain yang belum dikonfigurasi */}
        <Route path="/ppid/dokumen/*" element={<Placeholder />} />

        {/* Placeholder untuk halaman yang belum dibuat */}
        <Route path="/profil/*" element={<Placeholder />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<Berita />} />
        <Route path="/ejsc" element={<Placeholder />} />
        <Route path="/layanan/*" element={<Placeholder />} />
        <Route path="/sakip-rb" element={<SakipRb />} />
        <Route path="/inovasi/*" element={<Placeholder />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
