import puppeteer from 'puppeteer';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
// PostgreSQL
const testTableQuery = `
SELECT * FROM flats
`;
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS flats (
    id SERIAL PRIMARY KEY,
    name TEXT,
    links TEXT
  )
`;
const insertQuery = `
  INSERT INTO flats (name, links) VALUES ($1, $2)
`;
const pool = new pg.Pool({
    host: "localhost",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
});
await pool.query(createTableQuery);
const URL = "https://www.sreality.cz/en/search/for-sale/apartments";
async function fetchNames(url) {
    const browser = await puppeteer.launch({ executablePath: "/usr/bin/chromium", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.content-inner span.locality'); // makes it slower but it waits for the selector to load so it doesn't miss data
    let pairs = [];
    const elements = await page.$$('.property');
    for (const el of elements) {
        const span = await el.$eval('span.locality', (el) => el.textContent) || '';
        const anchors = await el.$$eval('[class$="jaeN"] img', (elements) => elements.map((el) => el.src));
        pairs.push({ span, anchors });
        await pool.query(insertQuery, [span, anchors.join(' ')]);
    }
    browser.close();
    return pairs;
}
for (let i = 1; i <= 25; i++) {
    const url = `${URL}?page=${i}`;
    const tempData = await fetchNames(url);
}
console.log("DONE SCRAPING");
//# sourceMappingURL=scraper.js.map