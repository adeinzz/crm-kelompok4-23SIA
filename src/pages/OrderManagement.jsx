import React, { useState } from "react";

const initialOrders = [
  {
    id: 1,
    customerName: "Alya Rahma",
    product: "Voal Square Signature",
    quantity: 2,
    price: 185000,
    total: 370000,
  },
  {
    id: 2,
    customerName: "Zahra Salsabila",
    product: "Pashmina Premium Silk",
    quantity: 1,
    price: 250000,
    total: 250000,
  },
  {
    id: 3,
    customerName: "Dinda Oktaviani",
    product: "Inner Ninja Comfort",
    quantity: 3,
    price: 55000,
    total: 165000,
  },
  {
    id: 4,
    customerName: "Laras Setyaningrum",
    product: "Silk Shawl Classic",
    quantity: 2,
    price: 275000,
    total: 550000,
  },
  {
    id: 5,
    customerName: "Nadya Amalia",
    product: "Buttonscarves Brooch Gold",
    quantity: 1,
    price: 145000,
    total: 145000,
  },
  {
    id: 6,
    customerName: "Farah Nuraini",
    product: "Satin Square Elegance",
    quantity: 2,
    price: 199000,
    total: 398000,
  },
  {
    id: 7,
    customerName: "Intan Ayu Lestari",
    product: "Blouse Modest Chic",
    quantity: 1,
    price: 459000,
    total: 459000,
  },
  {
    id: 8,
    customerName: "Raisa Fauziah",
    product: "Hijab Pins Set Rose Gold",
    quantity: 2,
    price: 35000,
    total: 70000,
  },
  {
    id: 9,
    customerName: "Salsabila Huda",
    product: "Pashmina Daily Breeze",
    quantity: 3,
    price: 120000,
    total: 360000,
  },
  {
    id: 10,
    customerName: "Mega Kusuma",
    product: "Voal Square Blossom Edition",
    quantity: 1,
    price: 195000,
    total: 195000,
  },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrder = () => {
    const { customerName, product, quantity, price } = formData;
    const qty = parseInt(quantity);
    const prc = parseInt(price);

    if (!customerName || !product || isNaN(qty) || isNaN(prc) || qty <= 0 || prc <= 0) {
      alert("Mohon isi semua kolom dengan benar.");
      return;
    }

    const total = qty * prc;
    const newOrder = {
      id: orders.length + 1,
      customerName,
      product,
      quantity: qty,
      price: prc,
      total,
    };

    setOrders([...orders, newOrder]);
    setFormData({
      customerName: "",
      product: "",
      quantity: "",
      price: "",
    });
    setShowForm(false);
  };

  const handleEdit = (order) => {
    setFormData({
      customerName: order.customerName,
      product: order.product,
      quantity: order.quantity,
      price: order.price,
    });
    setEditId(order.id);
    setShowForm(true);
  };

  const handleUpdateOrder = () => {
    const { customerName, product, quantity, price } = formData;
    const qty = parseInt(quantity);
    const prc = parseInt(price);

    if (!customerName || !product || isNaN(qty) || isNaN(prc) || qty <= 0 || prc <= 0) {
      alert("Mohon isi semua kolom dengan benar.");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === editId
        ? {
            ...order,
            customerName,
            product,
            quantity: qty,
            price: prc,
            total: qty * prc,
          }
        : order
    );

    setOrders(updatedOrders);
    setFormData({ customerName: "", product: "", quantity: "", price: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus pesanan ini?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Manajemen Pesanan Pelanggan
      </h1>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setFormData({ customerName: "", product: "", quantity: "", price: "" });
            setEditId(null);
          }}
          className={`mb-6 px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 ${
            showForm
              ? "bg-[#5A3E36] text-white"
              : "bg-white border border-[#B38E66] text-[#B38E66]"
          }`}
        >
          {showForm ? "Batal" : "Tambah Pesanan"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 border border-[#e0cfc1] rounded-2xl bg-white shadow-md">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nama Pelanggan</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Masukkan nama pelanggan"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Produk</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Contoh: Voal Square"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Jumlah</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Contoh: 1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Harga per Item (Rp)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Contoh: 250000"
            />
          </div>

          {editId !== null ? (
            <button
              onClick={handleUpdateOrder}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Update Pesanan
            </button>
          ) : (
            <button
              onClick={handleAddOrder}
              className="px-6 py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a07a54]"
            >
              Simpan Pesanan
            </button>
          )}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-[#e0cfc1]">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Produk</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">Jumlah</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">Harga/item</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4 text-right">{order.quantity}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(order.price)}</td>
                <td className="px-6 py-4 text-right font-medium">{formatCurrency(order.total)}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
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
                <td colSpan="6" className="text-center py-4 text-[#B38E66] italic">
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
