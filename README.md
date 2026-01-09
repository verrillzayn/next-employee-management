# 🚀 Aplikasi sederhana untuk mengelola data karyawan

Aplikasi manajemen data karyawan yang dibangun dengan **Next.js 15 (App Router)**. Proyek ini dirancang untuk mendemonstrasikan implementasi CRUD lengkap, validasi data yang ketat, serta fitur antarmuka tingkat lanjut seperti pencarian dan pengurutan data.

## ✨ Fitur Utama

### Fungsionalitas Inti (CRUD)

- **Tambah Karyawan (Create)**: Form input dengan validasi untuk menambahkan data baru.
- **Lihat Data (Read)**: Menampilkan daftar karyawan dalam tabel yang interaktif.
- **Edit Data (Update)**: Memperbarui informasi karyawan melalui modal yang user-friendly.
- **Hapus Data (Delete)**: Menghapus data dengan aman menggunakan konfirmasi dialog.

### 🌟 Fitur Unggulan (Advanced)

- **🔎 Pencarian Real-time (Filtering)**: Mencari nama karyawan secara instan langsung dari tabel.
- **cj Pengurutan Data (Sorting)**: Mengurutkan data berdasarkan ID, Nama, atau Jabatan, (Ascending/Descending).
- **🌗 Dark Mode**: Dukungan tema Gelap/Terang yang responsif dan nyaman di mata.
- **🛡️ Validasi Kuat**: Menggunakan **Zod** dan **React Hook Form** untuk menjamin integritas data (misal: validasi tanggal masa depan).
- **📊 Dashboard Ringkas**: Kartu statistik untuk melihat total karyawan, status aktif, dan distribusi jabatan (synced).

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Bahasa**: TypeScript
- **Database**: PostgreSQL (via Neon DB)
- **ORM**: Prisma
- **Styling**: Tailwind CSS

---

## 📂 Struktur Project

src/
├── app/
│ ├── actions/ # Server Actions (Logika Backend: Create, Update, Delete)
│ ├── page.tsx # Halaman Utama Dashboard (Server Component)
│ └── layout.tsx # Layout Global
├── components/
│ ├── employee-table/# Tabel Data dengan fitur Sort & Search
│ ├── ui/ # Komponen UI Reusable (Shadcn)
│ └── ... # Dialog Form, Toggle Tema, dll.
├── lib/
│ ├── prisma.ts # Instance Prisma Client
│ └── validator/ # Skema Validasi Zod
└── ...

---
