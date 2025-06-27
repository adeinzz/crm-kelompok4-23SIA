// src/pages/OrderManagement.js

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pesanan ini?")) {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) {
        console.error(error);
      } else {
        fetchOrders();
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Manajemen Pesanan Pelanggan
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-[#e0cfc1]">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Nama Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Produk
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Jumlah
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Harga / item
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Tanggal
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {orders.map((order, i) => (
              <tr key={order.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{order.customername}</td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4 text-right">{order.quantity}</td>
                <td className="px-6 py-4 text-right">
                  {formatCurrency(order.price)}
                </td>
                <td className="px-6 py-4 text-right font-semibold">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-600">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleString("id-ID")
                    : "-"}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-4 text-[#B38E66] italic"
                >
                  Belum ada pesanan tercatat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
