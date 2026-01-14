const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// --- VERİTABANI BAĞLANTISI ---
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hacettepe_webgis',
  password: 'marmarisaksaz123', // <--- BURAYA KENDİ ŞİFRENİ YAZ
  port: 5432,
});

pool.connect()
  .then(() => console.log('✅ Veritabanı Bağlantısı Başarılı'))
  .catch(err => console.error('❌ Bağlantı Hatası:', err));

// --- API ROTALARI ---

// 1. Kütüphane Verisini Getir (GET)
app.get('/api/library', async (req, res) => {
  try {
    const query = `SELECT name, status, ST_AsGeoJSON(location) as geom FROM library_locations`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. Durum Güncelle (PATCH - Admin)
app.patch('/api/library/status', async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query("UPDATE library_locations SET status = $1 WHERE name = 'Beytepe Kütüphanesi'", [status]);
    res.json({ message: "Durum Güncellendi" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 3. Not Yükle (POST - Öğrenci)
app.post('/api/notes', async (req, res) => {
  const { lessonName, noteUrl } = req.body;
  try {
    await pool.query("INSERT INTO lecture_notes (lesson_name, url) VALUES ($1, $2)", [lessonName, noteUrl]);
    res.json({ message: "Not Başarıyla Yüklendi" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 4. Notları Listele (GET)
app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM lecture_notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 5. Kayıt Ol (Register)
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const check = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (check.rows.length > 0) return res.status(400).json({ error: "Bu kullanıcı adı dolu!" });

    await pool.query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3)", [username, password, role]);
    res.json({ message: "Kayıt Başarılı! Giriş yapabilirsiniz." });
  } catch (err) { res.status(500).json({ error: "Kayıt hatası" }); }
});

// 6. Giriş Yap (Login)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, error: "Hatalı kullanıcı adı veya şifre" });
    }
  } catch (err) { res.status(500).json({ error: "Giriş Hatası" }); }
});

app.listen(3000, () => {
  console.log('🚀 Server çalışıyor: http://localhost:3000');
});