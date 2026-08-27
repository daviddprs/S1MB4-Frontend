/**
 * data/wilayah.js
 * Single source of truth untuk 10 daerah wilayah kerja Bakorwil I Madiun.
 *
 * Dipakai di:
 *  - src/pages/Home.jsx          (section marquee WILAYAH BAKORWIL I MADIUN)
 *  - src/pages/ProfilWilayahKerja.jsx (halaman Daerah Wilayah Kerja)
 */

import lambangMagetan      from '../assets/lambang-magetan.png';
import lambangMadiun       from '../assets/lambang-madiun.png';
import lambangKotaMadiun   from '../assets/lambang-kota-madiun.png';
import lambangPonorogo     from '../assets/lambang-ponorogo.png';
import lambangNgawi        from '../assets/lambang-ngawi.png';
import lambangPacitan      from '../assets/lambang-pacitan.png';
import lambangKediri       from '../assets/lambang-kediri.png';
import lambangKotaKediri   from '../assets/lambang-kota-kediri.png';
import lambangTrenggalek   from '../assets/lambang-trenggalek.png';
import lambangTulungagung  from '../assets/lambang-tulungagung.png';

/** @type {{ name: string, href: string, logo: string }[]} */
export const WILAYAH = [
  { name: 'Kab. Magetan',     href: 'https://magetankab.go.id',      logo: lambangMagetan },
  { name: 'Kab. Madiun',      href: 'https://madiunkab.go.id',       logo: lambangMadiun },
  { name: 'Kota Madiun',      href: 'https://madiunkota.go.id',      logo: lambangKotaMadiun },
  { name: 'Kab. Ponorogo',    href: 'https://ponorogo.go.id',        logo: lambangPonorogo },
  { name: 'Kab. Ngawi',       href: 'https://ngawikab.go.id',        logo: lambangNgawi },
  { name: 'Kab. Pacitan',     href: 'https://pacitankab.go.id',      logo: lambangPacitan },
  { name: 'Kab. Kediri',      href: 'https://kedirikab.go.id',       logo: lambangKediri },
  { name: 'Kota Kediri',      href: 'https://kedirikota.go.id',      logo: lambangKotaKediri },
  { name: 'Kab. Trenggalek',  href: 'https://trenggalekkab.go.id',   logo: lambangTrenggalek },
  { name: 'Kab. Tulungagung', href: 'https://tulungagungkab.go.id',  logo: lambangTulungagung },
];
