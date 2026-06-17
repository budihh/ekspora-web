export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Produk', value: '142', trend: '+12%', isPositive: true },
    { label: 'Inquiries Baru', value: '28', trend: '+5%', isPositive: true },
    { label: 'Kategori', value: '12', trend: '0%', isPositive: true },
    { label: 'Pengunjung Bulan Ini', value: '12.4k', trend: '-2%', isPositive: false }
  ];

  const recentActivity = [
    { id: '1', action: 'Produk Baru Ditambahkan', details: 'Arabica Gayo Grade 1', time: '10 menit yang lalu', user: 'Admin 1' },
    { id: '2', action: 'Inquiry Diterima', details: 'John Doe - 5 MT Cloves', time: '1 jam yang lalu', user: 'System' },
    { id: '3', action: 'Harga Diperbarui', Nilai: 'Black Pepper ASTA 570', time: '3 jam yang lalu', user: 'Admin 2' },
    { id: '4', action: 'Kategori Baru', details: 'Spices & Herbs', time: 'Kemarin', user: 'Admin 1' },
    { id: '5', action: 'Produk Dihapus', details: 'Old Coffee Stock', time: 'Kemarin', user: 'Admin 1' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-h2 font-display font-bold text-text-primary tracking-tight">Dashboard Overview</h1>
        <p className="text-small text-text-secondary mt-1">Ringkasan performa dan aktivitas terkini.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 bg-surface border border-border-hairline rounded-xl flex flex-col gap-3 hover:border-text-muted transition-colors">
            <span className="text-small font-medium text-text-muted">{stat.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-h2 font-display font-bold text-text-primary leading-none">{stat.value}</span>
              <span className={`text-micro font-medium ${stat.isPositive ? 'text-success' : 'text-error'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="mt-4 flex flex-col gap-4">
        <h2 className="text-h3 font-semibold text-text-primary">Recent Activity</h2>
        <div className="bg-surface border border-border-hairline rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-hairline bg-surface-2/50">
                  <th className="py-3 px-5 text-micro font-medium text-text-muted uppercase tracking-wider">Aktivitas</th>
                  <th className="py-3 px-5 text-micro font-medium text-text-muted uppercase tracking-wider">Detail</th>
                  <th className="py-3 px-5 text-micro font-medium text-text-muted uppercase tracking-wider">Waktu</th>
                  <th className="py-3 px-5 text-micro font-medium text-text-muted uppercase tracking-wider text-right">Oleh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-hairline">
                {recentActivity.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="py-3 px-5 text-small font-medium text-text-primary">{item.action}</td>
                    <td className="py-3 px-5 text-small text-text-secondary">{item.details}</td>
                    <td className="py-3 px-5 text-small text-text-muted">{item.time}</td>
                    <td className="py-3 px-5 text-small text-text-secondary text-right">{item.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
