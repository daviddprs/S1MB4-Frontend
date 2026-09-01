const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:5173/profil/visi-misi', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: 'scratch/screenshot.png', fullPage: true });

  await browser.close();
})();
