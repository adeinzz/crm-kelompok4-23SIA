import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function ProductGridView() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    active: true,
    image_url: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Gagal mengambil data produk.");
    } else {
      setProducts(data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const { name, category, price, image_url, active, stock } = formData;

    if (!name || !category || price === "" || stock === "") {
      alert("Semua kolom harus diisi.");
      return;
    }

    const payload = {
      name,
      category,
      image_url: image_url || null,
      price: parseFloat(price),
      active,
      stock: parseInt(stock, 10),
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingProduct.id);

      if (error) {
        console.error(error.message);
        alert("Gagal update produk: " + error.message);
      } else {
        fetchProducts();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("products")
        .insert([payload]);

      if (error) {
        console.error(error.message);
        alert("Gagal menyimpan produk: " + error.message);
      } else {
        fetchProducts();
        resetForm();
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(error.message);
        alert("Gagal menghapus produk: " + error.message);
      } else {
        fetchProducts();
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      active: product.active,
      image_url: product.image_url,
      stock: product.stock,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      category: "",
      price: "",
      active: true,
      image_url: "",
      stock: "",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Katalog Produk</h1>

      <button
        onClick={() => {
          if (editingProduct) resetForm();
          else setShowForm(!showForm);
        }}
        className="mb-6 px-4 py-2 bg-[#B38E66] text-white rounded-sm hover:bg-[#a37f58] transition"
      >
        {showForm
          ? editingProduct
            ? "Batal Edit Produk"
            : "Batal Tambah Produk"
          : "Tambah Produk"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
            placeholder="Nama Produk"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
            placeholder="Kategori"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
            placeholder="Harga"
            min="0"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
            placeholder="Stok"
            min="0"
          />
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="px-3 py-2 border rounded col-span-2"
            placeholder="URL Gambar"
          />
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="mr-2"
            />
            Tersedia
          </label>
          <button
            onClick={handleSave}
            className="w-full py-2 bg-[#B38E66] text-white rounded-sm hover:bg-[#a37f58] transition "
          >
            {editingProduct ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Tidak ada produk tersedia.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-contain bg-white p-2"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {product.category}
                </p>
                <p className="text-brown-600 font-semibold mb-2">
                  {formatCurrency(product.price)}
                </p>
                <span
                  className={`text-sm ${
                    product.active ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {product.active ? "Available" : "Sold Out"}
                </span>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-green-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
