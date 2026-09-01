const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:5173/profil/visi-misi', { waitUntil: 'networkidle2' });
  
  const results = await page.evaluate(() => {
    const banner = document.querySelector('.bts__banner-img');
    const wrap = document.querySelector('.bts__banner-wrap');
    const sidebar = document.querySelector('.bts__sidebar');
    const sidebarWrap = document.querySelector('.pr-visimisi-sidebar-wrap');
    const layout = document.querySelector('.pr-layout');
    const heading = document.querySelector('.pr-section__heading');
    
    function getStyles(el) {
      if (!el) return null;
      const comp = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        className: el.className,
        marginTop: comp.marginTop,
        paddingTop: comp.paddingTop,
        alignItems: comp.alignItems,
        display: comp.display,
        top: rect.top,
        height: rect.height,
        gridColumn: comp.gridColumn,
        gridRow: comp.gridRow,
        gridArea: comp.gridArea,
      };
    }

    return {
      banner: getStyles(banner),
      wrap: getStyles(wrap),
      sidebar: getStyles(sidebar),
      sidebarWrap: getStyles(sidebarWrap),
      layout: getStyles(layout),
      heading: getStyles(heading)
    };
  });

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
