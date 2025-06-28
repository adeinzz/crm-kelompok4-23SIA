import React, { useEffect, useState } from "react";
import { supabase } from "../supabase"; // pastikan path benar

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
  return true; // untuk 'all'
}

export default function SalesReport() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders") // sesuai nama tabelmu
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setOrders([]);
      } else {
        setOrders(data);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    isWithinPeriod(order.created_at, filter)
  );

  const totalOrders = filteredOrders.length;
  const totalSales = filteredOrders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  return (
    <div className="p-8 max-w-7xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-[#B38E66]">
        Laporan Penjualan
      </h1>

      {/* Filter */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {[
          { label: "Hari Ini", value: "today" },
          { label: "Minggu Ini", value: "week" },
          { label: "Bulan Ini", value: "month" },
          { label: "Semua", value: "all" },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 rounded-xl border ${
              filter === btn.value
                ? "bg-[#B38E66] text-white border-[#B38E66]"
                : "bg-white text-[#5A3E36] border-[#e0cfc1]"
            } hover:shadow-md transition`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md border border-[#e0cfc1] rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-[#5A3E36]">
            Jumlah Pesanan
          </h2>
          <p className="text-4xl font-bold text-[#B38E66] mt-2">
            {loading ? "Loading..." : totalOrders}
          </p>
        </div>
        <div className="bg-white shadow-md border border-[#e0cfc1] rounded-2xl p-6 text-center">
          <h2 className="text-lg font-semibold text-[#5A3E36]">
            Total Penjualan
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {loading ? "Loading..." : formatCurrency(totalSales)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md border border-[#e0cfc1] rounded-2xl">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Produk
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Qty
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Harga
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Subtotal
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f9f4ee]">
                  <td className="px-6 py-4">{order.customername}</td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4 text-center">{order.quantity}</td>
                  <td className="px-6 py-4 text-right">
                    {formatCurrency(order.price)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-[#B38E66] italic"
                >
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
