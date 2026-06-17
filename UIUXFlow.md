# EKSPORA
**Smart Corporate Website & AI Assistant**
**UI/UX FLOW DOCUMENT | v2.0**

---

| Field | Detail |
|---|---|
| **Dokumen** | UI/UX Flow Document — Panduan Tampilan & Alur User |
| **Proyek** | Ekspora — Premium Global B2B Platform & AI Assistant |
| **Versi** | 2.0 (Premium B2B SaaS Aesthetic & Framer Motion Integration) |
| **Dibuat untuk**| AI Agent (Antigravity & MCP 21st.dev) |

---

## 1. Design System & Token

### 1.1 Prinsip Desain (Pro Max Standard)
*   **Premium Global B2B SaaS Aesthetic:** Mengutamakan kesan mahal, berkelas dunia, dan berteknologi tinggi.
*   **Dark-First / Midnight Theme:** Latar belakang menggunakan warna *Obsidian* gelap (bukan hitam murni `#000000`) dengan *ambient mesh gradients* yang merespons kursor.
*   **Glassmorphism & Depth:** Penggunaan komponen UI yang melayang (*floating*) dengan efek kaca buram (`backdrop-blur-xl`, `bg-white/5`, `border-white/10`) untuk menciptakan ilusi 3D.
*   **Floating Bento Grid:** Konten tidak lagi disajikan dalam tabel/list kaku, melainkan menggunakan kartu asimetris (*Bento Grid*) yang modern.
*   **Proper Animations (Framer Motion):** Wajib menggunakan *spring physics*, *staggered fade-up*, dan *scroll reveals* (`whileInView`). Tidak ada pergerakan UI yang statis/kaku.
*   **Typography Hierarchy:** *Serif* modern elegan untuk *Headline* (menonjolkan warisan & premium), dan *Sans-Serif* geometris bersih untuk teks/data (menonjolkan presisi logistik).

### 1.2 Color Tokens
| Token Name | Value / Utility | Penggunaan |
|---|---|---|
| `--color-base` | `#050505` (Obsidian) | Background utama semua halaman. |
| `--color-glass` | `bg-white/5 backdrop-blur-xl` | Latar panel utama, *navbar*, dan kartu bento. |
| `--color-border-glass`| `border border-white/10` | Garis tepi komponen *glassmorphism*. |
| `--color-accent` | `#34D399` (Emerald) | Aksen cahaya, status aktif, kilauan kursor. |
| `--color-accent-gold` | `#F59E0B` (Earthy Gold)| Warna alternatif untuk produk unggulan (*Featured*). |
| `--color-text-primary`| `#F8FAFC` (Slate 50) | Teks utama (*heading*, *body* penting). |
| `--color-text-muted` | `#94A3B8` (Slate 400) | Teks sekunder, deskripsi teknis, label. |

### 1.3 Komponen Global Publik
*   **Floating Navbar:** Tidak menempel di atas layar, melainkan melayang (*margin-top*). Berbahan *Glassmorphism*. Menu: *Discover | Sectors | Portfolio | Heritage | Inquiries*. Tombol CTA CTA menggunakan efek *magnetic* saat di-*hover*.
*   **AI Chat Widget (Shadow DOM):** Tombol *floating* di pojok kanan bawah. Saat diklik, panel RAG Chatbot berbahan kaca muncul ke atas dengan animasi *spring*.
*   **Footer:** Bersih, terstruktur, menampilkan tautan ekspor dan kredibilitas dengan *background* yang menyatu ke `--color-base`.

---

## 2. Alur User — Halaman Publik (Elegant English)

### 2.1 Flow: Visitor Mencari Komoditas (B2B Lead Generation)
**Skenario:** *Procurement manager* dari luar negeri mencari *supplier* briket arang.

*   **Step 1: Landing di Discover (/)**
    *   Visitor tiba di beranda dan disambut *Cinematic Hero Section*. Latar belakang berupa *3D WebGL Globe* atau *Cinematic Macro Video* dengan *overlay* gelap.
    *   Teks *"Your Trusted Global Supply Chain Partner"* muncul kata per kata (*staggered text reveal*).
    *   Visitor melakukan *scroll*, *Bento Grid* komoditas unggulan (*Featured Sectors*) muncul melayang perlahan dari bawah (`fade-up`).
*   **Step 2: Navigasi ke Trade Portfolio (/portfolio)**
    *   Visitor mengklik menu *Portfolio*. Transisi halaman mulus.
    *   Melihat etalase asimetris. Visitor menggunakan filter *Glassmorphism* untuk memilih sektor "Bio-Energy".
    *   *Hover Interaction:* Saat kursor menyorot kartu briket arang, gambar sedikit membesar (`scale 1.05`), efek blur berkurang, dan label spesifikasi MOQ bergeser naik dari bawah gambar (*slide up*).
*   **Step 3: Melihat Detail Spesifikasi (/portfolio/[slug])**
    *   Klik kartu produk. Halaman detail menyajikan spesifikasi data JSON secara presisi (kadar abu, kalori, *origin*).
    *   Halaman memuat *Floating CTA "Partner with Us"*.
*   **Step 4: Mengirim Global Inquiry (/inquiries)**
    *   Klik CTA, form *Inquiry* elegan muncul. Visitor mengisi Nama, Perusahaan, dan Permintaan Tonase.
    *   Submit data (POST ke API) diakhiri dengan notifikasi *toast* sukses yang menyala (*glowing*).

### 2.2 Flow: Visitor Menggunakan AI Assistant
*   **Step 1:** Visitor butuh bantuan dan mengklik ikon *floating widget* di pojok kanan bawah.
*   **Step 2:** Panel AI terbuka (animasi lentur/spring). AI merespons pesan pembuka.
*   **Step 3:** Visitor mengetik: *"What is the minimum order for charcoal?"*
*   **Step 4:** AI mengeksekusi fungsi RAG dan Tool Calling. Respons dijawab dengan efek *real-time streaming* (huruf demi huruf bermunculan). Jika data harga tidak ada, AI mengarahkan ke form *Inquiry*.

---

## 3. Spesifikasi Komponen UI Detail (Prompt for AI Agent)

### 3.1 Trade Portfolio Card (Bento Grid Component)
**Instruksi untuk MCP 21st.dev:** Gunakan variasi komponen *Bento Box* yang interaktif.
*   **Base:** `relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6`.
*   **Image Layer:** Gambar resolusi tinggi, absolute, z-0. Memiliki filter `brightness-75`. Saat `group-hover`, terapkan `scale-105 brightness-100 transition-all duration-500`.
*   **Content Layer:** Berada di atas gambar (z-10). Teks judul menggunakan *font Serif*.
*   **Hover Reveal:** Data MOQ dan ketersediaan stok disembunyikan (`translate-y-4 opacity-0`). Tampil mulus saat *hover* (`translate-y-0 opacity-100`).

### 3.2 Floating Inputs & Forms
*   **Background:** Transparan atau `bg-white/5`.
*   **Border:** Bawahnya terang (`border-b border-white/20`), sisanya tidak ada border.
*   **Focus State:** Saat sedang diketik, *border* bawah menyala warna *Emerald* (`border-emerald-400`), dan label *placeholder* melayang ke atas (*Floating Label*).

---

## 4. Alur User — Admin CMS Dashboard
*(Alur administratif bersifat tertutup dan dioptimalkan murni untuk fungsionalitas dan efisiensi penginputan data)*

### 4.1 Flow Manajemen Katalog (Headless Style)
*   **Login (/admin/login):** Antarmuka hitam pekat sentralistik.
*   **Dashboard (/admin/dashboard):** *Sidebar* statis. Menyajikan statistik ringkas (*Total Products*, *Active Categories*, *Last AI Sync*).
*   **CRUD Form (/admin/products/new):** Form multi-kolom yang mendukung *drag-and-drop* untuk unggah *image* ke Vercel Blob. Admin menyimpan data, *Server Action* akan mengeksekusi `revalidatePath` untuk mereset *cache* halaman publik.
*   **AI Knowledge Sync (/admin/ai-sync):** Layar khusus dengan tombol pemicu (*Trigger*). Menampilkan terminal mini (log teks) secara *real-time* (SSE) saat *server* mengirimkan *embeddings* baru ke PostgreSQL (`pgvector`).

---

## 5. Sitemap & URL Structure (App Router)

| Rendering | URL Path | Fungsi Utama |
|---|---|---|
| **SSG+ISR** | `/` | **Discover** (Landing Page, Cinematic Hero, Overview). |
| **SSG+ISR** | `/sectors` | **Sectors** (Kategori lini bisnis, Bento Grid Kategori). |
| **SSR/CSR** | `/portfolio` | **Trade Portfolio** (Katalog interaktif B2B, Filter & Search). |
| **SSG+ISR** | `/portfolio/[slug]` | **Portfolio Detail** (Spesifikasi produk teknis). |
| **SSG+ISR** | `/heritage` | **Our Heritage** (Profil korporat, Kepemimpinan, Sertifikasi). |
| **SSG+ISR** | `/inquiries` | **Global Inquiries** (Kontak, Peta SCBD, Form Leads B2B). |
| **CSR** | `/admin/dashboard` | Area Admin Terproteksi (Akses menuju CRUD Produk, dll). |
| **API** | `/api/chat` | Endpoint AI RAG Streaming (Vercel AI SDK). |

---

## 6. Responsive Breakpoints (Tailwind)

| Breakpoint | Perilaku Layar |
|---|---|
| **Mobile (`sm: <640px`)** | *Floating Navbar* menyusut menjadi *Hamburger Menu*. *Bento Grid* menjadi 1 kolom tumpuk tegak. Form *Inquiries* memenuhi lebar layar. AI Chat widget menjadi *full-screen overlay*. |
| **Tablet (`md: 640–1024px`)** | *Bento Grid* beralih menjadi 2 kolom. *Sidebar Admin* menciut (*collapsed* menjadi *icon-only*). |
| **Desktop (`lg+: >1024px`)** | Resolusi *cinematic* maksimal. Grid asimetris 3-4 kolom. Semua animasi *hover* dan *mouse-tracking mesh gradients* diaktifkan secara maksimal. |

---
*— Akhir Dokumen UI/UX Flow Document v2.0 —*