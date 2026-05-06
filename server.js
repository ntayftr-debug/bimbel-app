const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Koneksi ke MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_bimbel'
});

db.connect(err => {
    if (err) throw err;
    console.log("Database Terhubung!");
});

// API untuk menerima pendaftaran
app.post('/daftar', (req, res) => {
    const { nama, kursus, wa } = req.body;
    const sql = "INSERT INTO pendaftaran (nama_siswa, kursus, whatsapp) VALUES (?, ?, ?)";
    db.query(sql, [nama, kursus, wa], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Pendaftaran Berhasil!" });
    });
});

app.listen(3000, () => console.log("Server running di http://localhost:3000"));