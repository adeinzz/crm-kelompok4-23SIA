// src/pages/ProductUser.js

import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function ProductUser() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [customername, setCustomername] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .gt("stock", 0);

    if (error) console.error(error);
    else setProducts(data);
  };

  const handleOrder = (product) => {
    setSelected(product);
    setQty(1);
    setCustomername("");
  };

  const confirmOrder = async () => {
    if (!customername || qty <= 0) {
      alert("Nama pelanggan dan jumlah wajib diisi.");
      return;
    }

    const total = Number(selected.price) * Number(qty);

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customername,
          product: selected.name,
          quantity: qty,
          price: selected.price,
          total,
        },
      ]);

    if (error) {
      console.error(error.message);
      alert("Gagal menyimpan pesanan: " + error.message);
    } else {
      alert(
        `Berhasil memesan ${qty} x ${selected.name}\nTotal: ${formatCurrency(
          total
        )}`
      );
      setSelected(null);
    }
  };

  return (
    <div className="bg-[#fef7f1] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#5A3E36] mb-10">
          Produk Buttonscarves
        </h1>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#e0cfc1] rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <div className="aspect-square overflow-hidden rounded-t-2xl">
                <img
                  src={p.image_url || "https://via.placeholder.com/300"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-[#5A3E36] mb-1">
                  {p.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{p.category}</p>
                <p className="text-[#B38E66] text-lg font-semibold mb-4">
                  {formatCurrency(p.price)}
                </p>
                <button
                  onClick={() => handleOrder(p)}
                  className="w-full py-2 bg-gradient-to-r from-[#B38E66] to-[#a37f58] text-white font-semibold rounded-full hover:opacity-90 transition"
                >
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-[#5A3E36] mb-4">
              Pesan Produk
            </h3>
            <div className="flex gap-4 mb-4">
              <img
                src={selected.image_url || "https://via.placeholder.com/150"}
                alt={selected.name}
                className="w-28 h-28 object-cover rounded-xl border border-[#e0cfc1]"
              />
              <div>
                <p className="text-[#5A3E36] font-semibold">{selected.name}</p>
                <p className="text-[#B38E66] font-bold text-lg">
                  {formatCurrency(selected.price)}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Stok tersedia: {selected.stock}
                </p>
              </div>
            </div>
            <label className="block mb-3 text-sm text-[#5A3E36]">
              Nama Pelanggan:
              <input
                type="text"
                value={customername}
                onChange={(e) => setCustomername(e.target.value)}
                className="w-full mt-1 p-2 border border-[#e0cfc1] rounded"
                placeholder="Masukkan nama Anda"
              />
            </label>
            <label className="block mb-3 text-sm text-[#5A3E36]">
              Jumlah:
              <input
                type="number"
                min="1"
                max={selected.stock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full mt-1 p-2 border border-[#e0cfc1] rounded"
              />
            </label>
            <p className="text-[#5A3E36] mt-2">
              Total:{" "}
              <span className="font-bold text-[#B38E66]">
                {formatCurrency(selected.price * qty)}
              </span>
            </p>
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={confirmOrder}
                className="px-5 py-2 bg-gradient-to-r from-[#B38E66] to-[#a37f58] text-white rounded-full font-semibold hover:opacity-90 transition"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
