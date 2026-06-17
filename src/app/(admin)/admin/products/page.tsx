import Link from 'next/link';

export const metadata = {
  title: 'Manajemen Produk | Admin Ekspora',
};

// Dummy data untuk representasi UI
const MOCK_PRODUCTS = [
  { id: '1', name: 'Lada Hitam Lampung Premium', category: 'Spices & Herbs', status: 'active', price: 'USD 4,500/Ton', updatedAt: '2026-06-08' },
  { id: '2', name: 'Kopi Arabika Gayo Grade 1', category: 'Coffee Beans', status: 'draft', price: '-', updatedAt: '2026-06-07' },
  { id: '3', name: 'Desiccated Coconut High Fat', category: 'Coconut Products', status: 'active', price: 'USD 1,200/Ton', updatedAt: '2026-06-05' },
];

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2 font-display font-bold text-text-primary tracking-tight mb-2">Katalog Produk</h1>
          <p className="text-small text-text-secondary">Kelola daftar komoditas ekspor, harga, spesifikasi, dan status tayang.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-text-primary text-[#08090A] px-5 py-2.5 rounded-xl font-bold text-small hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Produk Baru
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-surface border border-border-hairline rounded-2xl shadow-xl overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-border-hairline flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-2">
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Cari produk berdasarkan nama..." 
              className="w-full bg-base border border-border-hairline rounded-lg pl-10 pr-4 py-2.5 text-small text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
            <svg className="w-4 h-4 text-text-muted absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div className="flex gap-3 text-small">
            <select className="px-4 py-2.5 bg-base border border-border-hairline rounded-lg text-text-primary focus:border-accent outline-none appearance-none font-medium cursor-pointer">
              <option value="">Semua Kategori</option>
              <option value="spices">Spices & Herbs</option>
            </select>
            <button className="px-4 py-2.5 border border-border-hairline rounded-lg hover:bg-base text-text-primary font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-border-hairline bg-surface text-micro font-bold uppercase tracking-widest text-text-secondary">
                <th className="px-6 py-4">Nama Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Harga / MOQ</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline">
              {MOCK_PRODUCTS.map((prod) => (
                <tr key={prod.id} className="hover:bg-surface-2 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-small font-semibold text-text-primary group-hover:text-accent transition-colors cursor-pointer">{prod.name}</p>
                    <p className="text-micro text-text-muted mt-1 font-medium">Diperbarui {prod.updatedAt}</p>
                  </td>
                  <td className="px-6 py-4 text-small text-text-secondary">{prod.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      prod.status === 'active' 
                        ? 'bg-success/10 text-success border border-success/20' 
                        : 'bg-surface-2 text-text-muted border border-border-hairline'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-small font-medium text-text-primary">{prod.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-small font-semibold text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-base border border-transparent hover:border-border-hairline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border-hairline flex items-center justify-between text-micro font-medium uppercase tracking-widest text-text-secondary bg-surface-2">
          <span>Menampilkan 1-10 dari 24 produk</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border-hairline rounded-md hover:bg-base hover:text-text-primary transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1.5 border border-border-hairline rounded-md hover:bg-base hover:text-text-primary transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
