import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image_url: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Ambil data dari Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Tambah atau update produk
  const handleSaveProduct = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.image_url) {
      alert("Semua kolom harus diisi");
      return;
    }

    if (editId) {
      // Update
      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
        })
        .eq("id", editId);
      if (error) console.error(error);
    } else {
      // Insert
      const { error } = await supabase.from("products").insert([
        {
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
        },
      ]);
      if (error) console.error(error);
    }

    setFormData({ name: "", category: "", price: "", image_url: "" });
    setEditId(null);
    setShowForm(false);
    fetchProducts();
  };

  // ✅ Edit produk
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image_url: product.image_url,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  // ✅ Hapus produk
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) console.error(error);
      fetchProducts();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Produk</h1>

      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormData({ name: "", category: "", price: "", image_url: "" });
          setEditId(null);
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Batal" : "Tambah Produk"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              placeholder="Masukkan nama produk"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Kategori</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              placeholder="Contoh: Elektronik"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">URL Gambar</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              placeholder="Contoh: https://..."
            />
          </div>

          <button
            onClick={handleSaveProduct}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editId ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Harga</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gambar</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4 text-center">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-16 mx-auto rounded object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(product.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada produk tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
