import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import PpidBerkala from './pages/PpidBerkala';
import PpidDikecualikan from './pages/PpidDikecualikan';
import PpidSertaMerta from './pages/PpidSertaMerta';
import PpidSetiapSaat from './pages/PpidSetiapSaat';
import Placeholder from './pages/Placeholder';
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

        {/* Placeholder untuk halaman yang belum dibuat */}
        <Route path="/profil/*" element={<Placeholder />} />
        <Route path="/berita" element={<Placeholder />} />
        <Route path="/ejsc" element={<Placeholder />} />
        <Route path="/layanan/*" element={<Placeholder />} />
        <Route path="/sakip-rb" element={<Placeholder />} />
        <Route path="/inovasi/*" element={<Placeholder />} />
      </Routes>
    </>
  );
}

export default App;
