import React, { useState, useEffect } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Deux Trapezoid Sunglasses - Summer Sand ",
    category: "Aksesoris",
    price: 1575000,
    active: true,
    image: "https://www.buttonscarves.com/cdn/shop/files/DEUXTRAPEZOIDSUMMERSAND1.jpg?v=1741684059&width=1200",
  },
  {
    id: 2,
    name: "Meela Pump – Blue",
    category: "Scarves",
    price: 495000,
    active: true,
    image: "https://www.buttonscarves.com/cdn/shop/files/Palm_Spring_Series_-_Old_Town.jpg?v=1747726382&width=1200",
  },
  {
    id: 3,
    name: "Halo Hobo Bag - Lamb",
    category: "Bags",
    price: 3275000,
    active: true,
    image: "https://www.buttonscarves.com/cdn/shop/files/HaloHoboBag-Lamb2.jpg?v=1744703769&width=1200",
  },
  {
    id: 4,
    name: "Monogram Jacquard Kids Dress - Navy",
    category: "Apparel",
    price: 975000,
    active: true,
    image: "https://www.buttonscarves.com/cdn/shop/files/MonogramJacquardKidsDress-Navy.jpg?v=1741341812&width=1200",
  },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function ProductGridView() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    active: true,
    image: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const { name, category, price, image, id } = formData;
    if (!name || !category || !price || !image) {
      alert("Semua kolom harus diisi");
      return;
    }

    const updatedProduct = {
      ...formData,
      id: editingProduct ? editingProduct.id : id || Date.now(),
      price: parseFloat(price),
    };

    const updatedList = editingProduct
      ? products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
      : [...products, updatedProduct];

    setProducts(updatedList);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", category: "", price: "", active: true, image: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      active: product.active,
      image: product.image,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Katalog Produk</h1>

      <button
        onClick={() => {
          if (editingProduct) resetForm();
          else setShowForm(!showForm);
        }}
        className="mb-6 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
      >
        {showForm ? (editingProduct ? "Batal Edit Produk" : "Batal Tambah Produk") : "Tambah Produk"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
            placeholder="ID Produk (opsional)"
          />
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
            type="text"
            name="image"
            value={formData.image}
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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            {editingProduct ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Tidak ada produk tersedia.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain bg-white p-2"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <p className="text-brown-600 font-semibold mb-2">{formatCurrency(product.price)}</p>
                <span
                  className={`text-sm ${product.active ? "text-green-600" : "text-gray-400"}`}
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
