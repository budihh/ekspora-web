# EKSPORA
**Smart Corporate Website & AI Assistant**
**SOFTWARE REQUIREMENTS SPECIFICATION (SRS) v2.0**

---

| Field | Detail |
|---|---|
| **Dokumen** | Software Requirements Specification (SRS) |
| **Proyek** | Ekspora — Premium Global B2B Platform & AI Assistant |
| **Status** | Final — For AI Agent (Antigravity) Consumption |
| **Versi** | 2.0 (Direvisi untuk UI/UX Pro Max & Elegant English) |

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen SRS ini mendefinisikan seluruh persyaratan fungsional dan non-fungsional untuk sistem Ekspora[cite: 3]. Dokumen ini berfungsi sebagai pedoman tunggal bagi AI agent (Antigravity/Codex) dalam mengimplementasikan setiap modul sistem, memastikan konsistensi dan kebenaran perilaku aplikasi, terutama pada penerapan standar visual *Premium Global B2B SaaS Aesthetic*[cite: 3].

### 1.2 Ruang Lingkup
Sistem Ekspora mencakup tiga domain utama:
*   **Frontend Public:** Website profil perusahaan berbahasa Inggris dengan halaman *Sectors*, *Trade Portfolio* dinamis, *Our Heritage*, *Global Inquiries*, dan AI chatbot[cite: 3]. Menggunakan antarmuka *Glassmorphism* dan animasi *Framer Motion*.
*   **Admin CMS:** Dashboard manajemen konten *headless-style* untuk tim Ekspora — termasuk manajemen produk, kategori, profil perusahaan, dan sinkronisasi AI *knowledge base*[cite: 3].
*   **AI Engine:** Sistem RAG (Retrieval-Augmented Generation) yang terhubung ke *vector database* produk, kategori, dan profil perusahaan[cite: 3].

---

## 2. Ikhtisar Sistem

### 2.1 Aktor Sistem
| Aktor | Deskripsi | Akses |
|---|---|---|
| **Visitor / Buyer** | Buyer internasional yang mencari informasi komoditas ekspor. | Seluruh halaman publik: `/`, `/sectors`, `/portfolio`, `/portfolio/[slug]`, `/heritage`, `/inquiries`. Dapat menggunakan AI chatbot dan form *inquiry*[cite: 3]. |
| **Admin** | Tim internal Ekspora pengelola konten. | Seluruh route `/admin/*` setelah login. Dapat mengelola data dan RAG *sync*[cite: 3]. |
| **AI Agent** | Ekspora AI Assistant (RAG Engine). | *Read-only* ke *vector database* via *Semantic Search*. Dapat memanggil *tool* `getProductDetails`[cite: 3]. |

---

## 3. Persyaratan Fungsional

### 3.1 Modul Frontend Publik (Elegant English)

#### 3.1.1 Halaman Discover (/)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-001** | Sistem HARUS menampilkan *Cinematic Hero Section* dengan *ambient video/3D Globe*, teks *staggered fade-up*, dan CTA utama. | Critical | *Hero section* ter-render instan; CTA mengarah ke `/sectors`[cite: 3]. |
| **FR-002** | Sistem HARUS menampilkan *Global Network Overview*. | High | Konten diambil dari tabel `company_profile`[cite: 3]. |
| **FR-003** | Sistem HARUS menampilkan *Featured Sectors/Commodities* (max 6). | High | Menggunakan layout asimetris *Bento Grid*; `is_featured = true`[cite: 3]. |
| **FR-008** | Sistem HARUS menampilkan *Floating Chatbot Widget* (Shadow DOM) di pojok kanan bawah. | Critical | Widget muncul di seluruh halaman publik[cite: 3]. |

#### 3.1.2 Halaman Sectors (/sectors)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-020** | Sistem HARUS menampilkan kategori komoditas dalam tata letak *Bento Grid* interaktif berlapis *Glassmorphism*. | Critical | Data dari `categories` di mana `status = 'active'`[cite: 3]. |
| **FR-021** | Setiap item HARUS menampilkan nama kategori, deskripsi, dan tombol nav. | Critical | Tombol mengarahkan ke `/portfolio?category=[slug]`[cite: 3]. |

#### 3.1.3 Halaman Trade Portfolio (/portfolio)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-030** | Sistem HARUS menampilkan semua produk aktif dalam kartu asimetris (*floating cards*). | Critical | Hanya `status = 'active'`; *scroll reveals* animasi masuk[cite: 3]. |
| **FR-031** | Sistem HARUS menyediakan filter *Glassmorphism* berdasarkan kategori produk. | High | Query param `?category=xxx`; tanpa *full page reload*[cite: 3]. |
| **FR-032** | Sistem HARUS menyediakan *search bar realtime* (debounce 300ms). | High | Query param `?q=xxx`[cite: 3]. |
| **FR-034** | *Hover state* kartu HARUS memicu efek pembesaran lambat (`scale 1.05`) dan *slide-up* spesifikasi. | Critical | Implementasi menggunakan `Framer Motion`[cite: 3]. |

#### 3.1.4 Halaman Detail Portfolio (/portfolio/[slug])
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-040** | Sistem HARUS menampilkan spesifikasi detail teknis komoditas berdasarkan slug. | Critical | Return 404 jika slug tidak valid[cite: 3]. |
| **FR-041** | Sistem HARUS menampilkan tabel spesifikasi JSON (*key-value*), MOQ, Origin, dan *Carousel/Gallery*. | Critical | Harga HANYA tampil jika terisi di database[cite: 3]. |
| **FR-042** | Sistem HARUS menyediakan CTA "*Partner with Us*" menuju form *Inquiry*. | High | Modal/Form pre-filled dengan nama produk via `POST /api/inquiry`[cite: 3]. |

#### 3.1.5 Halaman Our Heritage (/heritage)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-050** | Sistem HARUS memuat identitas *Corporate*, Sejarah, dan Visi/Misi. | Critical | Konten statis terhubung ke `company_profile`[cite: 3]. |
| **FR-053** | Sistem HARUS menampilkan *Global Credentials* (Legalitas & Sertifikasi). | High | Data dari `company_certifications`[cite: 3]. |
| **FR-054** | Sistem HARUS menampilkan susunan *Leadership Team*. | High | Data dari `team_members`[cite: 3]. |

#### 3.1.6 Halaman Global Inquiries (/inquiries)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-060** | Sistem HARUS memuat detail *Trade Desks* (Kontak, Alamat SCBD, Email). | Critical | Sinkronisasi dengan tabel `company_profile`[cite: 3]. |
| **FR-064** | Sistem HARUS menyediakan *Floating Inquiry Form* elegan berbasis validasi Zod. | Critical | Submit via `POST /api/inquiry`; tanpa mewajibkan *login*[cite: 3]. |

### 3.2 Modul AI Chatbot (Ekspora AI Assistant)
| ID | Requirement | Priority | Validation Rule |
|---|---|---|---|
| **FR-070** | AI HANYA boleh menjawab berdasarkan *knowledge base* Ekspora via pgvector. | Critical | Menolak instruksi di luar konteks logistik/produk Ekspora[cite: 3]. |
| **FR-071** | AI HARUS menggunakan *real-time token streaming* (Vercel AI SDK). | Critical | *First token response* < 2 detik[cite: 3]. |
| **FR-074** | AI HARUS dapat mengeksekusi *Tool Calling* (`getProductDetails`). | High | Mengambil `status`, `MOQ`, `spesifikasi` langsung dari Drizzle ORM[cite: 3]. |
| **FR-076** | UI Chatbot WAJIB berjalan di dalam *Shadow DOM*. | Critical | Untuk menghindari *CSS leakage* ke antarmuka utama[cite: 3]. |

### 3.3 Modul Admin CMS
*(Sesuai SRS v1.1 - Autentikasi NextAuth, CRUD Produk, Manajemen Kategori, Company Profile, Dashboard Stats, dan Fitur Trigger pgvector Embeddings via `/admin/ai-sync` berlaku penuh dan tetap sama).*[cite: 3]

---

## 4. Aturan Bisnis (Business Rules)
| ID | Aturan Bisnis |
|---|---|
| **BR-001** | Produk berstatus `inactive` atau `draft` TIDAK boleh dirender di `/portfolio` atau `/portfolio/[slug]`[cite: 3]. |
| **BR-002** | Slug produk IMMUTABLE pasca-*publish* demi integritas SEO[cite: 3]. |
| **BR-004** | Mutasi data (Admin CRUD) HARUS mengeksekusi `revalidatePath` untuk membersihkan *cache* ISR pada jalur `/portfolio` dan `/portfolio/[slug]`[cite: 3]. |
| **BR-021** | Ambang batas *Cosine Similarity* RAG adalah `>= 0.75`. Jika di bawah itu, AI beralih ke *fallback response* dan menyarankan CTA ke `/inquiries`[cite: 3]. |
| **BR-023** | AI DILARANG mencantumkan estimasi harga bila data `price_min`/`price_max` `NULL` di database[cite: 3]. |

---

## 5. Persyaratan Non-Fungsional (NFR)

### 5.1 Performa & UI/UX Pro Max Standard
| ID | Parameter | Kriteria Sukses |
|---|---|---|
| **UI-001** | **Component Sourcing** | AI Agent WAJIB memprioritaskan impor *UI parts* (Bento grids, Globes, Navbars) dari *library* 21st.dev/Context7. |
| **UI-002** | **Proper Animations** | Seluruh *layout transitions* wajib dibungkus `<AnimatePresence>` (Framer Motion) menggunakan fisika pegas (misal: `stiffness: 100, damping: 20`). |
| **UI-003** | **Glassmorphism Logic** | Komponen wadah panel publik menggunakan *utility classes* campuran (transparansi + blur + border tipis): `bg-white/5 backdrop-blur-xl border border-white/10`. |
| **PRF-01** | **Core Web Vitals** | Lighthouse Score >= 90; FCP < 1.5 detik (terlepas dari besaran efek rendering animasi)[cite: 3]. |

### 5.2 Keamanan & Infrastruktur
*   **SEC-001:** Seluruh *environment variables* (API Keys LLM, Database URL) diproteksi di eksekusi *server-side* (Server Actions/Route Handlers)[cite: 3].
*   **SEC-002:** Zod Schema untuk *input sanitization* wajib diterapkan pada *Inquiry Form* dan *Admin Panel*[cite: 3].
*   **INF-001:** Halaman publik di-SSG via metode Incremental Static Regeneration (ISR) 60 detik (kecuali *search* dinamis) untuk keandalan performa global[cite: 3].