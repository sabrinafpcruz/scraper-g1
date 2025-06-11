require('dotenv').config();
const nodemailer = require('nodemailer');
const { fetchNoticias } = require('../scraper/app'); // caminho para seu scraper do IMDb

async function enviarEmail() {
  try {
    const filmes = await fetchNoticias();

    if (filmes.length === 0) {
      console.log('Nenhum filme encontrado.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const corpoTexto = [
      'Aqui estão as ultimas 5 noticias de tecnologia do G1:',
      ...filmes.map(f => `• ${f.titulo} ${f.ano}\n${f.link}\n`),
    ].join('\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sabrinafpcruz@gmail.com',
      subject: 'Ultimas noticias TEC do G1',
      text: corpoTexto,
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

enviarEmail();
