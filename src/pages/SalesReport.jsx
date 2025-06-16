import React, { useEffect, useState } from "react";

const dummySales = [
  { id: 1, product: "Pashmina Signature", quantity: 2, price: 120000, date: "2025-06-16" },
  { id: 2, product: "Square Scarf Elegant", quantity: 1, price: 95000, date: "2025-06-15" },
  { id: 3, product: "Buttonscarves Tote Bag", quantity: 3, price: 180000, date: "2025-06-10" },
  { id: 4, product: "Silk Scarf Exclusive", quantity: 1, price: 200000, date: "2025-06-03" },
  { id: 5, product: "Travel Pouch", quantity: 4, price: 85000, date: "2025-05-28" },
  { id: 6, product: "Scarf Ring", quantity: 2, price: 45000, date: "2025-06-01" },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

function isWithinPeriod(dateStr, period) {
  const now = new Date();
  const date = new Date(dateStr);

  if (period === "today") {
    return date.toDateString() === now.toDateString();
  }
  if (period === "week") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return date >= weekAgo && date <= now;
  }
  if (period === "month") {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }
  return true;
}

export default function SalesReport() {
  const [filter, setFilter] = useState("all");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const filtered = dummySales.filter((sale) => isWithinPeriod(sale.date, filter));
    setFilteredSales(filtered);
  }, [filter]);

  const totalOrders = filteredSales.length;
  const totalSales = filteredSales.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Laporan Penjualan
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {[
          { label: "Hari Ini", value: "today" },
          { label: "Minggu Ini", value: "week" },
          { label: "Bulan Ini", value: "month" },
          { label: "Semua", value: "all" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-xl border ${
              filter === value
                ? "bg-[#B38E66] text-white border-[#B38E66]"
                : "bg-white text-[#5A3E36] border-[#e0cfc1]"
            } hover:shadow-md transition`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md border border-[#e0cfc1] rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-[#5A3E36]">Jumlah Pesanan</h2>
          <p className="text-4xl font-bold text-[#B38E66] mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white shadow-md border border-[#e0cfc1] rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-[#5A3E36]">Total Penjualan</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {formatCurrency(totalSales)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md border border-[#e0cfc1] rounded-2xl">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Produk</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Qty</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">Harga</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">Subtotal</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {filteredSales.map((item) => (
              <tr key={item.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{item.product}</td>
                <td className="px-6 py-4 text-center">{item.quantity}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(item.price)}</td>
                <td className="px-6 py-4 text-right font-medium">
                  {formatCurrency(item.quantity * item.price)}
                </td>
                <td className="px-6 py-4 text-center">{item.date}</td>
              </tr>
            ))}
            {filteredSales.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-[#B38E66] italic">
                  Tidak ada data penjualan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
