# Covid Dashboard

Aplikasi berikut adalah sistem yang digunakan untuk menampilkan data Covid-19 secara real-time. Data yang ditampilkan diperoleh melalui API eksternal dan diproses serta disajikan melalui antarmuka pengguna berbasis web.

## Tools dan Framework yang Digunakan

### Backend
- **NestJS**: Framework Node.js untuk membangun aplikasi backend yang efisien dan scalable.
- **TypeORM**: ORM yang digunakan untuk menghubungkan NestJS dengan MySQL, menyederhanakan interaksi dengan basis data.
- **ScheduleModule**: Modul untuk menjadwalkan dan menjalankan tugas secara berkala, seperti penarikan data atau proses data lainnya.
- **ServeStaticModule**: Modul untuk melayani file statis (frontend) seperti HTML, CSS, dan JS.

### Frontend
- **Vue.js**: Framework JavaScript untuk membangun antarmuka pengguna yang responsif dan interaktif.
- **Axios**: Digunakan untuk menarik data dari API eksternal dan berkomunikasi dengan backend.
- **Bootstrap**: Digunakan untuk mempercantik tampilan antarmuka pengguna.
- *ChartJS*: Digunakan untuk membuat chart secara responsif dan interaktif.

### Database
- **MySQL**: Sistem manajemen basis data relasional yang digunakan untuk menyimpan data Covid-19 secara lokal.

---

## Alur Proses: Dari Penarikan Data API hingga Tampilan UI

1. **Penarikan Data Menggunakan API**
   - Backend menggunakan **Axios** untuk menarik data Covid-19 dari API eksternal seperti `https://covid-api.com/api/`.
   - Data yang diambil mencakup statistik Covid-19 untuk Indonesia dan global, seperti jumlah kasus terkonfirmasi, sembuh, dan kematian.

2. **Proses dan Penyimpanan Data**
   - Setelah data diterima dari API, backend akan memproses dan menyimpannya ke dalam **database MySQL** melalui entitas `CovidData` dan `CovidGlobalData`.
   - Data difilter dan disusun untuk mempermudah pengambilan dan analisis di frontend.

3. **Pengambilan Data oleh Frontend**
   - **Vue.js** menggunakan **Axios** untuk mengakses API backend dan menampilkan data dalam tampilan yang ramah untuk pengguna.
   - Data yang ditampilkan termasuk jumlah kasus Covid-19, sembuh, dan kematian dalam bentuk tabel dan grafik.

4. **Tampilan UI**
   - UI dibuat menggunakan **Vue.js** dengan komponen seperti tabel, grafik, dan indikator.
   - Antarmuka responsif yang memudahkan pengguna untuk memantau data Covid-19 secara real-time.
   - Menampilkan persentase potensi kasus covid di Indonesia dan Global, dengan rumus berikut:
     Percentage of Confirmed Cases = (Confirmed Cases / Confirmed Cases + Recovered + Deaths) x 100%
   - Menambahkan analisa dari data yang didapat menggunakan rumus berikut:
     a. Recovery Rate = (Recovered Cases / Confirmed Cases) x 100%
     b. Death Rate = (Death / Confirmed Cases) x 100%
     c. Active Cases = Confirmed Cases - (Recovered Cases + Death) 


---

## Sinkronisasi Data

- **Sinkronisasi Manual dengan API Eksternal**
   - Data diambil secara periodik menggunakan **ScheduleModule** di backend untuk memperbarui data Covid-19.
   - Setiap pembaruan data yang diterima akan disinkronkan dengan **database MySQL**.

- **Penyimpanan Data**
   - Setelah diterima, data akan disimpan dalam bentuk snapshot pada tabel yang sesuai (`CovidData` dan `CovidGlobalData`).
   - Dengan struktur ini, data dapat dengan mudah diambil dan ditampilkan di frontend.

---

## Struktur Database dan Alasan Desainnya

### Struktur Database
- **Tabel `CovidData`**
  - Menyimpan data Covid-19 untuk Indonesia, dengan kolom:
    - `id`: ID auto increament
    - `confirmed`: Jumlah kasus terkonfirmasi
    - `recovered`: Jumlah pasien yang sembuh
    - `deaths`: Jumlah kematian
    - `date`: Tanggal data disimpan
  
- **Tabel `CovidGlobalData`**
  - Menyimpan data Covid-19 global, dengan kolom:
    - `id`: ID auto increament
    - `confirmed`: Jumlah kasus terkonfirmasi global
    - `recovered`: Jumlah pasien sembuh global
    - `deaths`: Jumlah kematian global
    - `date`: Tanggal data disimpan

### Alasan Desain
- **Normalisasi**: Memisahkan data lokal (Indonesia) dan global memungkinkan manajemen data yang lebih mudah dan efisien.
- **Skalabilitas**: Dengan desain ini, Anda dapat menambahkan lebih banyak negara atau wilayah di masa depan jika diperlukan.
- **Kinerja**: Pemisahan data mempercepat query dan mengurangi overhead dalam mengambil data yang tidak relevan.

---

## Masalah Teknis

### 1. Masalah API Eksternal
   - Perlu penyesuaian untuk kebutuhan testing karna api https://covid-api.com/api/ terakhir update tanggal 2023-03-09, sehingga perlu patching di database.
