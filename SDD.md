# EKSPORA — System Design Document (SDD) v2.0

**Premium Global B2B Platform & AI RAG Assistant**

---

| Field       | Detail                                                    |
| ----------- | --------------------------------------------------------- |
| **Dokumen** | System Design Document / SDD                              |
| **Proyek**  | Ekspora — Premium Global B2B Platform & AI Assistant      |
| **Versi**   | 2.0 (Direvisi sesuai PRD UI/UX Pro Max & Elegant English) |
| **Cakupan** | Arsitektur, Database, API Design, AI Pipeline, Deployment |

---

# Daftar Isi

1. [Arsitektur Sistem](#1-arsitektur-sistem)
2. [Database Design](#2-database-design)
3. [API Design](#3-api-design)
4. [Arsitektur AI & RAG Pipeline](#4-arsitektur-ai--rag-pipeline)
5. [Deployment & Infrastructure](#5-deployment--infrastructure)

---

# 1. Arsitektur Sistem

## 1.1 Overview Arsitektur

Ekspora menggunakan arsitektur Jamstack modern dengan Next.js 16 App Router sebagai inti. Sistem dirancang dengan prinsip **separation of concerns** yang ketat, memisahkan layer presentasi (berbasis Glassmorphism & Framer Motion), logika bisnis, dan data.

## 1.2 Layer Arsitektur

| Layer              | Teknologi                                                    | Tanggung Jawab                                                           |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| **Presentation**   | Next.js 16, React 19, Tailwind CSS, Shadcn UI, Framer Motion | Rendering UI premium, proper animation, glassmorphism, client-side state |
| **Application**    | Next.js Server Actions, API Routes (`/api/*`)                | Business logic, request validation (Zod), orchestration                  |
| **AI Engine**      | Vercel AI SDK, LLM (Gemini/OpenRouter), pgvector             | RAG pipeline, embedding generation, streaming response                   |
| **Data**           | PostgreSQL (Vercel Postgres), Drizzle ORM                    | Data persistence, query optimization, type safety                        |
| **Infrastructure** | Vercel Edge Network, Vercel Blob Storage                     | CDN, deployment, file storage, domain management                         |

---

## 1.3 Alur Request Data

### 1.3.1 Request Halaman Publik (SSG/ISR)

```text
Browser
   ↓
Vercel Edge (CDN)
   ↓
Static HTML dari build
   ↓
Hydration React di browser
```

Untuk data dinamis:

```text
Browser
   ↓
Next.js API Route
   ↓
Drizzle ORM
   ↓
PostgreSQL
   ↓
JSON Response
```

**Halaman SSG + ISR (60 detik)**

* `/`
* `/sectors`
* `/portfolio/[slug]`
* `/heritage`
* `/inquiries`

**Halaman SSR/CSR**

* `/portfolio` (filter & search dinamis)

---

### 1.3.2 Request AI Chatbot

```text
1. User mengetik pesan → React state update → POST /api/chat

2. Server:
   - Generate embedding query
   - Semantic search pgvector

3. Ambil Top-5 dokumen relevan
   - Threshold similarity ≥ 0.75

4. Susun prompt:
   - System Prompt
   - Retrieved Context
   - Histori (maks. 10 pesan)
   - User Message

5. Kirim ke LLM melalui Vercel AI SDK
   - streamText()

6. Streaming token via SSE
   - Server → Client
   - UI update real-time
```

---

### 1.3.3 Request Admin CMS

```text
1. Admin Login
   ↓
   NextAuth.js
   ↓
   JWT Session (HttpOnly Cookie)

2. Middleware cek session
   ↓
   /admin/*
   ↓
   Redirect jika tidak valid

3. Admin CRUD Data
   ↓
   Server Action
   ↓
   Drizzle ORM
   ↓
   PostgreSQL

4. Setelah sukses
   ↓
   revalidatePath()
   ↓
   ISR Cache Invalidated
```

---

## 1.4 Struktur Direktori Proyek

```text
ekspora/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── sectors/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── heritage/
│   │   │   └── page.tsx
│   │   └── inquiries/
│   │       └── page.tsx
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── login/page.tsx
│   │       ├── dashboard/page.tsx
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       ├── categories/
│   │       │   └── page.tsx
│   │       ├── company/
│   │       │   └── page.tsx
│   │       └── ai-sync/
│   │           └── page.tsx
│   │
│   └── api/
│       ├── chat/route.ts
│       ├── inquiry/route.ts
│       ├── portfolio/route.ts
│       ├── portfolio/[slug]/route.ts
│       ├── sectors/route.ts
│       ├── company/route.ts
│       └── admin/
│           ├── products/route.ts
│           ├── products/[id]/route.ts
│           ├── products/[id]/images/route.ts
│           ├── categories/route.ts
│           ├── categories/[id]/route.ts
│           ├── company/route.ts
│           ├── ai/sync/route.ts
│           └── stats/route.ts

├── components/
│   ├── ui/
│   ├── public/
│   │   ├── CinematicHero.tsx
│   │   ├── FloatingNavbar.tsx
│   │   ├── BentoGridItem.tsx
│   │   ├── FloatingInquiry.tsx
│   │   └── ChatWidget/
│   │       ├── ChatWidget.tsx
│   │       └── MessageBubble.tsx
│   └── admin/

├── db/
│   ├── schema/
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── company.ts
│   │   ├── embeddings.ts
│   │   └── users.ts
│   └── index.ts

├── lib/
│   ├── ai/
│   │   ├── rag.ts
│   │   ├── embeddings.ts
│   │   └── tools.ts
│   └── utils.ts

└── middleware.ts
```

---

# 2. Database Design

## 2.1 Entity Relationship Overview

```text
categories
    │
    └──< products

products
    ├──< product_images
    └──< knowledge_embeddings

company_profile
    ├──< company_certifications
    ├──< team_members
    └──< knowledge_embeddings

categories
    └──< knowledge_embeddings

users
    └──< admin_logs
```

---

## 2.2 Schema Detail

### Table: categories

| Column      | Type         | Constraint                            |
| ----------- | ------------ | ------------------------------------- |
| id          | uuid         | PRIMARY KEY DEFAULT gen_random_uuid() |
| name        | varchar(100) | NOT NULL UNIQUE                       |
| slug        | varchar(120) | NOT NULL UNIQUE                       |
| description | text         | NULLABLE                              |
| icon        | varchar(255) | NULLABLE                              |
| status      | varchar(20)  | DEFAULT 'active'                      |
| created_at  | timestamptz  | DEFAULT NOW()                         |

---

### Table: products

| Column         | Type          | Constraint            |
| -------------- | ------------- | --------------------- |
| id             | uuid          | PRIMARY KEY           |
| name           | varchar(100)  | NOT NULL              |
| slug           | varchar(120)  | UNIQUE                |
| category_id    | uuid          | FK categories.id      |
| description    | text          | NOT NULL              |
| short_desc     | varchar(300)  | NULLABLE              |
| specifications | jsonb         | DEFAULT '{}'          |
| origin         | varchar(100)  | NULLABLE              |
| price_min      | numeric(15,2) | NULLABLE              |
| price_max      | numeric(15,2) | NULLABLE              |
| moq            | integer       | NULLABLE              |
| moq_unit       | varchar(50)   | NULLABLE              |
| status         | varchar(20)   | active/inactive/draft |
| is_featured    | boolean       | DEFAULT false         |
| updated_at     | timestamptz   | DEFAULT NOW()         |

---

### Table: knowledge_embeddings

| Column      | Type         | Constraint               |
| ----------- | ------------ | ------------------------ |
| id          | uuid         | PRIMARY KEY              |
| entity_type | varchar(30)  | product/category/company |
| entity_id   | uuid         | NOT NULL                 |
| embedding   | vector(1536) | pgvector                 |
| content     | text         | NOT NULL                 |
| updated_at  | timestamptz  | DEFAULT NOW()            |

---

### Table: company_profile

| Column         | Type         |
| -------------- | ------------ |
| id             | uuid         |
| name           | varchar(100) |
| tagline        | varchar(300) |
| about_html     | text         |
| vision         | text         |
| mission        | text         |
| values         | jsonb        |
| founded_year   | integer      |
| address        | text         |
| email          | varchar(255) |
| phone          | varchar(50)  |
| whatsapp       | varchar(50)  |
| business_hours | varchar(200) |
| maps_embed_url | text         |

---

## 2.3 Indexing Strategy

```sql
CREATE UNIQUE INDEX idx_knowledge_embeddings_entity
ON knowledge_embeddings (entity_type, entity_id);

CREATE INDEX USING hnsw (embedding vector_cosine_ops)
ON knowledge_embeddings;

CREATE UNIQUE INDEX idx_products_slug
ON products (slug);

CREATE INDEX idx_products_category_id
ON products (category_id);
```

---

# 3. API Design

## 3.1 Public API Endpoints

| Method | Endpoint              | Auth | Deskripsi            |
| ------ | --------------------- | ---- | -------------------- |
| GET    | /api/sectors          | None | List kategori aktif  |
| GET    | /api/portfolio        | None | List produk aktif    |
| GET    | /api/portfolio/[slug] | None | Detail produk        |
| GET    | /api/company          | None | Profil perusahaan    |
| POST   | /api/chat             | None | AI chatbot streaming |
| POST   | /api/inquiry          | None | Form inquiry         |

---

## 3.2 Admin API Endpoints

| Method     | Endpoint                 | Auth      | Deskripsi                   |
| ---------- | ------------------------ | --------- | --------------------------- |
| GET/POST   | /api/admin/products      | Admin JWT | List & Create Product       |
| PUT/DELETE | /api/admin/products/[id] | Admin JWT | Update/Delete Product       |
| GET/POST   | /api/admin/categories    | Admin JWT | Category Management         |
| PUT        | /api/admin/company       | Admin JWT | Update Company Profile      |
| POST       | /api/admin/ai/sync       | Admin JWT | Re-Embedding Knowledge Base |

---

# 4. Arsitektur AI & RAG Pipeline

## 4.1 Retrieval-Augmented Generation Flow

1. User message → Embedding Vector (1536 dimensi)
2. Semantic Search menggunakan pgvector
3. Ambil context relevan dari database
4. Susun prompt lengkap
5. Kirim ke Gemini/OpenRouter
6. Streaming response ke UI menggunakan SSE

---

## 4.2 System Prompt AI

```text
You are Ekspora AI Assistant — a professional B2B assistant for Ekspora.

Your role is to help international buyers learn about Ekspora's
portfolio and sectors.

RULES:

1. ONLY answer questions based on the provided context below.
2. If no relevant context is found, respond:
   "Please contact our global trade desk at [email]
   or WhatsApp [whatsapp]."
3. Do NOT invent product details or pricing.
4. Keep responses strictly professional,
   concise, and B2B-oriented.

CONTEXT:
{{RETRIEVED_CONTEXT}}
```

---

## 4.3 AI Tool — getProductDetails

Tool ini digunakan untuk mengambil detail produk secara real-time dari database ketika LLM mendeteksi kebutuhan informasi spesifik seperti:

* MOQ
* Origin
* Technical Specification
* Product Availability

---

# 5. Deployment & Infrastructure

## 5.1 Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

OPENAI_API_KEY=

GOOGLE_AI_API_KEY=
OPENROUTER_API_KEY=

BLOB_READ_WRITE_TOKEN=
```

---

## 5.2 Cache Invalidation Strategy

| Trigger                 | Cache Target             | Mekanisme           |
| ----------------------- | ------------------------ | ------------------- |
| CRUD Product            | /portfolio               | revalidatePath()    |
| Update Featured Product | /                        | revalidatePath('/') |
| Update Company Profile  | /heritage, /inquiries, / | revalidatePath()    |
| CRUD Category           | /sectors, /portfolio     | revalidatePath()    |

---

Semua proses invalidasi cache dilakukan secara server-side melalui Server Actions setelah transaksi database berhasil diselesaikan.

---

**End of Document — EKSPORA SDD v2.0**
