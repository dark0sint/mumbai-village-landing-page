const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');  // Untuk mengirim email (ganti dengan kredensial email Anda)
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve file statis dari public/

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route untuk menangani form kontak (back-end sederhana: kirim email)
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Konfigurasi nodemailer (ganti dengan email Anda, misalnya Gmail)
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',  // Ganti dengan email Anda
      pass: 'your-password'  // Ganti dengan password atau app password
    }
  });

  const mailOptions = {
    from: email,
    to: 'admin@mumbaivillage.com',  // Ganti dengan email tujuan
    subject: 'Pesan dari Landing Page Mumbai Village',
    text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error mengirim pesan');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Pesan berhasil dikirim!');
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
