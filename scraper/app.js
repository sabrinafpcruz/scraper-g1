const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://g1.globo.com/tecnologia/';

async function fetchNoticias() {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const html = await response.text();

    const $ = cheerio.load(html);
    const noticias = [];

    $('.feed-post-body').each(function () {
      const titulo = $(this).find('.feed-post-link').text().trim();
      const link = $(this).find('.feed-post-link').attr('href');

      if (titulo && link) {
        noticias.push({ titulo, link });
      }
    });

    return noticias.slice(0, 5);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

module.exports = { fetchNoticias };
