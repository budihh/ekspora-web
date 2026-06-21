# EKSPORA

# Product Requirements Document (PRD)

## Premium Global B2B Platform & AI RAG Assistant

---

## 1. Executive Summary

Ekspora merupakan platform digital B2B premium yang dirancang untuk memperkuat kehadiran perusahaan komoditas Indonesia di pasar global. Website ini bukan sekadar profil perusahaan, melainkan *cinematic digital storefront* dan mesin penghasil prospek (*lead generation*) bagi *buyer* internasional.

Mengusung estetika *Modern Global Logistics* dengan antarmuka berbasis *Glassmorphism* dan animasi *fluid*, platform ini dilengkapi dengan Ekspora AI Assistant berbasis Retrieval-Augmented Generation (RAG). AI ini mampu menjawab pertanyaan terkait spesifikasi produk dan informasi perdagangan secara *real-time*. Website dibangun dengan pendekatan super cepat, *scalable*, SEO-friendly, dan berorientasi pada pengalaman kelas *Enterprise/SaaS*.

---

## 2. Goals & Objectives

### Business Goals

* Memosisikan Ekspora sebagai *Supply Chain Partner* tingkat global yang bonafide dan berkelas.
* Menghasilkan *inbound leads* berkualitas tinggi dari *procurement managers* dan importir asing.
* Membangun *trust* instan melalui presentasi visual yang mahal, transparan, dan sangat profesional.

### Product Goals

* Mencapai Lighthouse Score ≥ 90.
* Menyajikan *immersive browsing experience* tanpa mengorbankan performa *load time*.
* Mengintegrasikan *AI Assistant* yang merespons pertanyaan berbasis *knowledge base* perusahaan.

### Design & UI/UX Goals (PRO MAX STANDARD)

* Mengadopsi visual *Premium Corporate Aesthetic* dengan tema *Dark/Midnight*.
* Mengimplementasikan efek *Glassmorphism* (blur & transparansi) yang realistis untuk menciptakan ilusi kedalaman (*3D depth*).
* Menghapus desain kaku dengan menggantinya menggunakan *Bento Grid layouts* dan *Floating UI*.
* Menerapkan *Proper Animation* menggunakan **Framer Motion** (*spring physics, scroll reveals, magnetic interactions*).
* Menggunakan aset visual berkelas dunia (*Cinematic Ambient Video* atau *Interactive WebGL Globe*).

---

## 3. Product Scope

Sistem terdiri dari tiga domain utama:

1. **Public Trade Platform (Frontend):** Website premium berbahasa Inggris (*English-only*) untuk *buyers* global.
2. **Admin CMS (Backend/Dashboard):** Panel internal *headless-style* untuk mengelola data komoditas dan *AI knowledge*.
3. **AI Assistant (RAG Engine):** Asisten AI yang terhubung langsung dengan *Vector Database* perusahaan.

---

## 4. Website Information Architecture (Elegant English-Only)

### Discover (/) *(formerly Home)*

*Pintu gerbang sinematik perusahaan.*

* **Cinematic Hero Section:** *Ambient background* (Video/3D Globe) dengan *floating glassmorphism panel* dan *animated typography*.
* **Global Network Overview:** Visualisasi jangkauan ekspor.
* **Featured Sectors:** *Highlight* komoditas unggulan dalam *Bento Grid*.
* **Partner with Us (CTA):** Tombol *magnetic* menuju *inquiry*.

### Our Heritage (/heritage) *(formerly About Us)*

*Membangun kredibilitas korporat dan etika rantai pasok.*

* **Corporate Identity:** Sejarah dan skala operasional perusahaan.
* **Ethical Sourcing & Sustainability:** Komitmen pada petani lokal dan lingkungan.
* **Leadership & Expertise:** Jajaran eksekutif perusahaan.
* **Global Credentials:** Legalitas dan sertifikasi internasional.

### Sectors (/sectors) *(formerly Commodities)*

*Kategori lini bisnis utama perusahaan.*

* **Commodity Lines:** Grid interaktif (misal: *Spices, Bio-Energy, Essential Oils, Agro-Products*).
* **Market Insights:** Ringkasan potensi pasar dari masing-masing sektor.

### Trade Portfolio (/portfolio) *(formerly Catalog)*

*Etalase data teknis untuk kebutuhan B2B.*

* **Dynamic Portfolio Grid:** Tampilan kartu komoditas berlapis *glassmorphism*.
* **Advanced Filtering:** Pencarian berdasarkan *Origin, Category,* atau *MOQ*.
* **Technical Specifications:** Halaman detail produk yang berisi tabel data teknis, *export terms*, dan *direct inquiry button*.

### Insights (/insights) *(formerly News)*

*Pusat artikel dan SEO content marketing.*

* **Market Updates:** Tren harga dan pasokan global.
* **Corporate News:** Berita pengiriman, ekspansi, atau pameran bisnis internasional.

### Global Inquiries (/inquiries) *(formerly Contact)*

*Kanal konversi utama B2B.*

* **Floating Inquiry Form:** Formulir elegan untuk meminta kuotasi harga.
* **Global Office Locations:** Detail alamat SCBD Jakarta dengan *styled map*.
* **Direct Trade Desks:** Kontak khusus (Email/WhatsApp) untuk *sales inquiries*.

---

## 5. Core Features

### A. Public Trade Platform

* **Immersive Interactions:** Animasi masuk (*staggered fade-up*) saat di-*scroll*, *hover states* pada *Bento boxes*, dan perpindahan halaman yang mulus.
* **Dynamic Trade Portfolio:** Integrasi katalog *real-time* dari CMS.
* **Secure Lead Generation:** Validasi *form inquiry* (Zod) dengan perlindungan *anti-spam*.

### B. Ekspora AI Assistant (RAG)

* **Shadow DOM Widget:** UI Chatbot melayang (*glassmorphism style*) yang terisolasi dari CSS global.
* **Tool Calling & Semantic Search:** Mengambil data spesifikasi, harga, dan *supply* dari *database pgvector*.
* **Real-time Streaming:** Menampilkan efek mengetik langsung (*token-by-token*) via Vercel AI SDK.

---

## 6. UI/UX & AI Agent Development Guidelines (Antigravity & MCP 21st.dev)

Bagian ini adalah instruksi wajib bagi eksekusi AI Agent:

* **Component Sourcing:** AI wajib memprioritaskan pengambilan komponen UI kompleks (*Animated Navbars, 3D Globes, Background Meshes, Bento Grids*) dari **MCP 21st.dev** dan **Context7**.
* **Dark-First Premium:** Gunakan warna dasar *Obsidian/Midnight* (bukan `#000000` murni), dengan aksen *Emerald* atau *Earthy Gold*.
* **Glassmorphism Logic:** Komponen utama harus menggunakan *utility* kombinasi Tailwind: `bg-white/5 backdrop-blur-xl border border-white/10` dengan bayangan *glow* yang sangat halus.
* **Framer Motion Mandatory:** Tidak ada render statis. Gunakan `<AnimatePresence>`, *spring physics* (`stiffness: 100, damping: 20`), dan `whileInView` untuk efek *reveal*.
* **Typography:** Gunakan kombinasi *font Serif* modern (untuk *Headline*) dan *Sans-Serif* geometris bersih (untuk *Body/Data*).

---

## 7. Tech Stack *(No Changes from Original)*

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Shadcn UI
* **Framer Motion** *(Ditambahkan khusus untuk UI/UX Pro Max animations)*

### Backend & API

* Node.js (LTS Runtime)
* Express.js (Web Framework)
* TypeScript
* RESTful API Architecture

### Database & ORM

* PostgreSQL
* Drizzle ORM
* pgvector (Untuk *AI Embeddings*)

### AI Layer

* Vercel AI SDK
* Gemini / OpenRouter (LLM Engine)

### Security & Storage

* NextAuth.js
* Vercel Blob Storage

---

## 8. Content Management System (CMS)

* **Trade Portfolio Management:** Mengelola spesifikasi produk, MOQ, *images*, dan ketersediaan komoditas.
* **Corporate Profile & Insights:** Mengelola halaman *Our Heritage* dan artikel *Insights*.
* **Inquiry Dashboard:** CRM mini untuk membaca dan membalas *Global Inquiries*.
* **AI Knowledge Sync:** Panel untuk melakukan ekstraksi dan sinkronisasi teks menjadi vektor ke dalam `pgvector`.

---

## 9. Project Roadmap

* **Phase 1 — UI/UX & Foundation:** Setup Next.js, Framer Motion, implementasi MCP 21st.dev komponen, *Dark Glassmorphism Design System*.
* **Phase 2 — Public Trade Platform:** *Discover, Heritage, Sectors, Portfolio, Insights, Inquiries*.
* **Phase 3 — Headless CMS:** Integrasi Node/Express, Drizzle ORM, CRUD komoditas dan *inquiries*.
* **Phase 4 — AI & RAG Engine:** Setup `pgvector`, integrasi Vercel AI SDK, pembuatan *prompt system*, *chatbot widget UI*.
* **Phase 5 — Optimization:** SEO teknis, *Core Web Vitals tuning*, *Deployment* via Vercel.

---

## 10. Success Metrics

* Lighthouse Score ≥ 90 (Perfoma tinggi meski menggunakan animasi).
* First Contentful Paint < 1.5 detik.
* AI First Response < 2 detik.
* Konversi pengunjung menjadi *Inquiry Submitters* meningkat tajam berkat UI/UX yang *trusted* dan premium.