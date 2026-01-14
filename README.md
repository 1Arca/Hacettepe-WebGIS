# 📍 Hacettepe Web GIS - Ders Notu Paylaşım & Kütüphane Portalı

Bu proje, Hacettepe Üniversitesi **GMT 458 - Web GIS** dersi 2025-2026 Dönemi Final Ödevi kapsamında geliştirilmiştir. 

Proje, öğrencilerin ders notlarını paylaşabilecekleri, Beytepe Kütüphanesi'nin doluluk durumunu mekansal olarak sorgulayabilecekleri ve yöneticilerin bu durumu güncelleyebilecekleri tam kapsamlı (Full Stack) bir Web GIS uygulamasıdır.

## 🚀 Proje Özellikleri ve Karşılanan Gereksinimler

Bu proje, ödev yönergesindeki aşağıdaki kriterleri sağlamaktadır:

### 1. Kullanıcı Rolleri ve Yönetimi (User Types - %20) 
Sistemde 3 farklı kullanıcı rolü bulunmaktadır:
* **Admin (Yönetici/Akademisyen):** Kütüphane doluluk durumunu (Müsait/Dolu) değiştirebilir.
* **Student (Öğrenci):** Sisteme ders notu yükleyebilir ve diğer notları görüntüleyebilir.
* **Guest (Misafir):** Kayıt olmadan haritayı ve yüklenen not listesini görüntüleyebilir (Salt Okunur).

### 2. Kimlik Doğrulama (Authentication - %15) 
* Kullanıcılar sisteme **Kayıt Olabilir (Sign Up)**.
* Kayıtlı kullanıcılar **Giriş Yapabilir (Login)**.
* Oturum yönetimi sayesinde kullanıcı rolüne göre paneller (Admin/Öğrenci paneli) otomatik açılır.

### 3. CRUD İşlemleri (%15) 
* **Create (Ekleme):** Öğrenciler veritabanına yeni ders notu ekleyebilir.
* **Read (Okuma):** Tüm kullanıcılar kütüphane konumunu ve not listesini okuyabilir.
* **Update (Güncelleme):** Yöneticiler kütüphane durum verisini güncelleyebilir.
* **Spatial Data:** Kütüphane konumu PostGIS `GEOMETRY` formatında saklanmakta ve sorgulanmaktadır.

### 4. API Geliştirme (%25) 
Node.js ve Express.js kullanılarak RESTful API geliştirilmiştir:
* `GET /api/library`: Mekansal veriyi GeoJSON formatında döner .
* `POST /api/notes`: Yeni ders notu oluşturur .
* `PATCH /api/library/status`: Kütüphane durumunu günceller .
* `GET /api/notes`: Ders notlarını listeler.

---

## 🛠 Kullanılan Teknolojiler

* **Frontend:** HTML5, CSS3 (Modern UI), JavaScript, Leaflet.js (Harita Kütüphanesi)
* **Backend:** Node.js, Express.js
* **Veritabanı:** PostgreSQL + PostGIS Extension

---

## ⚙️ Kurulum ve Çalıştırma (Installation)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
* Node.js (v14 veya üzeri)
* PostgreSQL ve PostGIS eklentisi

### 2. Projeyi İndirme
```bash
git clone [https://github.com/KULLANICI_ADIN/REPO_ADIN.git](https://github.com/KULLANICI_ADIN/REPO_ADIN.git)
cd REPO_ADIN
npm install
