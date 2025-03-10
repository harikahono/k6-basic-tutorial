# Tutorial K6 untuk Pemula

Penulis: **Bintang Hari Kahono**

---

## **Langkah 1: Instalasi k6 di Kali Linux**

1. **Update Package List**:
   Buka terminal dan jalankan perintah berikut untuk memperbarui daftar paket:
   ```bash
   sudo apt update
   ```

2. **Instal Dependensi**:
   Instal paket yang diperlukan untuk menambahkan repositori k6:
   ```bash
   sudo apt install -y ca-certificates gnupg2
   ```

3. **Tambahkan Kunci GPG k6**:
   Tambahkan kunci GPG resmi k6 untuk memverifikasi paket:
   ```bash
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-key C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   ```

4. **Tambahkan Repositori k6**:
   ```bash
   echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   ```

5. **Update Package List Lagi**:
   ```bash
   sudo apt update
   ```

6. **Instal k6**:
   ```bash
   sudo apt install k6
   ```

7. **Verifikasi Instalasi**:
   ```bash
   k6 version
   ```

---

## **Langkah 2: Membuat Skrip k6**

1. **Buat Direktori untuk Skrip**:
   ```bash
   mkdir ~/k6-scripts
   cd ~/k6-scripts
   ```

2. **Buat Skrip Pertama (`test.js`)**:
   ```bash
   nano test.js
   ```
   Isi file:
   ```javascript
   import http from 'k6/http';
   import { check, sleep } from 'k6';

   export default function () {
     let res = http.get('https://www.kampusgratis.id/api/auth/session');
     check(res, {
       'status is 200': (r) => r.status === 200,
       'response time < 500ms': (r) => r.timings.duration < 500,
     });
     sleep(1);
   }
   ```

3. **Buat Skrip Kedua (`test-high.js`)**:
   ```bash
   nano test-high.js
   ```
   Isi file:
   ```javascript
   import http from 'k6/http';
   import { check, sleep } from 'k6';

   export let options = {
     vus: 50,
     duration: '1m',
   };

   export default function () {
     let res = http.get('https://www.kampusgratis.id/api/auth/session');
     check(res, {
       'status is 200': (r) => r.status === 200,
       'response time < 500ms': (r) => r.timings.duration < 500,
     });
     sleep(1);
   }
   ```

---

## **Langkah 3: Menjalankan Skrip k6**

1. **Jalankan Skrip Pertama (`test.js`)**:
   ```bash
   k6 run test.js
   ```

2. **Jalankan Skrip Kedua (`test-high.js`)**:
   ```bash
   k6 run test-high.js
   ```

---

## **Langkah 4: Memahami Output**
- **Status Code**: Pastikan status code adalah `200`.
- **Response Time**: Periksa apakah waktu respons memenuhi kriteria (`< 500ms`).
- **Checks**: Pastikan semua checks berhasil (`100.00%`).
- **HTTP Metrics**: Analisis metrik seperti `http_req_duration` dan lainnya.
- **Iterations**: Jumlah iterasi yang berhasil diselesaikan.

---

## **Langkah 5: Tips untuk Pemula**

1. **Mulai dengan Skrip Sederhana**: Gunakan skrip dasar untuk memahami konsep.
2. **Tingkatkan Beban Secara Bertahap**: Tambah jumlah VUs atau durasi tes.
3. **Gunakan Opsi Tambahan**: Eksplorasi opsi seperti `--vus`, `--duration`, dll.
4. **Pelajari Dokumentasi k6**: Kunjungi [dokumentasi resmi k6](https://k6.io/docs/).

---

## **Langkah 6: Membersihkan Instalasi (Opsional)**
Jika ingin menghapus k6:
```bash
sudo apt remove k6
sudo rm /etc/apt/sources.list.d/k6.list
```

---

Dengan tutorial ini, Anda bisa menginstal, membuat skrip, dan menjalankan k6 untuk menguji performa server. Selamat mencoba! 🚀

