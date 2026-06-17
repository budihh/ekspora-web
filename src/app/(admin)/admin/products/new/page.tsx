import Link from 'next/link';

export const metadata = {
  title: 'Tambah Produk | Admin Ekspora',
};

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-micro font-bold uppercase tracking-widest text-text-secondary mb-3">
            <Link href="/admin/products" className="hover:text-text-primary transition-colors">Produk</Link>
            <span className="text-border-hairline">/</span>
            <span className="text-text-primary">Baru</span>
          </div>
          <h1 className="text-h2 font-display font-bold text-text-primary tracking-tight">Tambah Produk Baru</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products" className="px-6 py-3 rounded-xl font-bold text-small border border-border-hairline hover:bg-surface-2 transition-colors text-text-primary shadow-sm">
            Batal
          </Link>
          <button className="bg-text-primary text-[#08090A] px-6 py-3 rounded-xl font-bold text-small hover:opacity-90 transition-all shadow-lg">
            Simpan Produk
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Kolom Kiri: Informasi Utama */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-surface border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-h3 font-semibold text-text-primary mb-6">Informasi Dasar</h2>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Nama Produk <span className="text-accent">*</span></label>
                <input type="text" placeholder="Cth: Lada Hitam Lampung Premium" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Kategori <span className="text-accent">*</span></label>
                  <select className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer transition-all">
                    <option value="">Pilih kategori...</option>
                    <option value="1">Spices & Herbs</option>
                    <option value="2">Coffee Beans</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Daerah Asal</label>
                  <input type="text" placeholder="Cth: Lampung, Indonesia" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Deskripsi Singkat</label>
                <input type="text" placeholder="Ringkasan produk untuk list katalog publik (maks 300 karakter)..." className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Deskripsi Lengkap <span className="text-accent">*</span></label>
                <textarea rows={6} placeholder="Penjelasan detail tentang spesifikasi, kualitas, dan kegunaan produk..." className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-y transition-all"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-h3 font-semibold text-text-primary mb-6">Harga & Minimum Order (FOB)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Harga Minimum (USD)</label>
                <input type="number" placeholder="4500" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Harga Maksimum (USD)</label>
                <input type="number" placeholder="5200" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Minimum Order (MOQ)</label>
                <input type="number" placeholder="1" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Satuan MOQ</label>
                <input type="text" placeholder="Cth: Ton, Kg, Container" className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-h3 font-semibold text-text-primary">Spesifikasi Teknis</h2>
              <button type="button" className="text-micro font-bold uppercase tracking-widest text-accent hover:brightness-110 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Tambah Baris
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input type="text" placeholder="Key (Cth: Grade)" className="w-full sm:flex-1 bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                <input type="text" placeholder="Value (Cth: ASTA / Grade 1)" className="w-full sm:flex-1 bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                <button className="text-text-muted hover:text-red-500 p-2 transition-colors self-end sm:self-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input type="text" placeholder="Key (Cth: Moisture)" className="w-full sm:flex-1 bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                <input type="text" placeholder="Value (Cth: Max 12%)" className="w-full sm:flex-1 bg-base border border-border-hairline rounded-lg px-4 py-3 text-small text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                <button className="text-text-muted hover:text-red-500 p-2 transition-colors self-end sm:self-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Media & Status */}
        <div className="w-full xl:w-80 flex flex-col gap-8">
          <div className="bg-surface border border-border-hairline rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-h3 font-semibold text-text-primary mb-6">Visibilitas</h2>
            
            <div className="space-y-6 border-b border-border-hairline pb-6 mb-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-micro font-semibold uppercase tracking-widest text-text-secondary">Status Publikasi</label>
                <select className="bg-base border border-border-hairline rounded-lg px-4 py-3 text-small font-medium text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer">
                  <option value="active">Active (Publik)</option>
                  <option value="draft">Draft (Sembunyikan)</option>
                  <option value="inactive">Inactive (Arsip)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-small font-semibold text-text-primary">Featured Product</p>
                  <p className="text-micro text-text-secondary mt-1">Tampilkan di halaman Beranda</p>
                </div>
                {/* Custom Toggle UI Placeholder */}
                <div className="w-12 h-6 bg-base border border-border-hairline rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-text-muted rounded-full absolute left-1 top-1 transition-all"></div>
                </div>
              </div>
            </div>

            <h2 className="text-h3 font-semibold text-text-primary mb-6">Galeri Media</h2>
            
            <div className="space-y-4">
              {/* Main Photo Upload Area */}
              <div className="w-full aspect-square bg-base border border-dashed border-border-hairline rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-text-muted hover:bg-surface-2 transition-all relative overflow-hidden group">
                <div className="text-text-muted flex flex-col items-center group-hover:text-text-secondary transition-colors">
                  <svg className="w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="text-micro font-bold uppercase tracking-widest">Upload Cover</span>
                </div>
              </div>
              
              {/* Secondary Photos */}
              <div className="flex gap-3">
                <div className="w-1/3 aspect-square bg-base border border-dashed border-border-hairline rounded-xl flex items-center justify-center cursor-pointer hover:border-text-muted hover:bg-surface-2 transition-all">
                  <span className="text-h3 text-text-muted font-light">+</span>
                </div>
                <div className="w-1/3 aspect-square bg-base border border-dashed border-border-hairline rounded-xl flex items-center justify-center cursor-pointer hover:border-text-muted hover:bg-surface-2 transition-all">
                  <span className="text-h3 text-text-muted font-light">+</span>
                </div>
                <div className="w-1/3 aspect-square bg-base border border-dashed border-border-hairline rounded-xl flex items-center justify-center cursor-pointer hover:border-text-muted hover:bg-surface-2 transition-all">
                  <span className="text-h3 text-text-muted font-light">+</span>
                </div>
              </div>
              <p className="text-micro text-text-muted text-center pt-2">Format: JPG, PNG, WebP. Maks 2MB.</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
