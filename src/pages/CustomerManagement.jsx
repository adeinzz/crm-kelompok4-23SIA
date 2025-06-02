import React, { useState } from "react";

const initialCustomers = [
  { id: 1, name: "Budi Santoso", email: "budi@mail.com", phone: "081234567890", active: true, gender: "male" },
  { id: 2, name: "Siti Aminah", email: "siti@mail.com", phone: "089876543210", active: false, gender: "female" },
  { id: 3, name: "Andi Wijaya", email: "andi@mail.com", phone: "081299988877", active: true, gender: "male" },
];

// Ambil inisial dari nama
const getInitials = (name) => {
  const names = name.split(" ");
  return names.length === 1
    ? names[0].charAt(0).toUpperCase()
    : (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
};

// Warna avatar berdasarkan gender dan status aktif
const getAvatarColor = (gender, active) => {
  if (gender === "female") {
    return active
      ? "bg-pink-400 text-white"
      : "bg-pink-100 text-pink-600";
  }
  // laki-laki = biru tua
  return active
    ? "bg-blue-900 text-white"
    : "bg-blue-200 text-blue-900";
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", active: true, gender: "male" });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Semua field wajib diisi!");
      return;
    }
    if (editingId) {
      setCustomers((prev) =>
        prev.map((cust) => (cust.id === editingId ? { id: editingId, ...formData } : cust))
      );
      setEditingId(null);
    } else {
      const newCustomer = {
        id: customers.length > 0 ? customers[customers.length - 1].id + 1 : 1,
        ...formData,
      };
      setCustomers((prev) => [...prev, newCustomer]);
    }
    setFormData({ name: "", email: "", phone: "", active: true, gender: "male" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      setCustomers(customers.filter((c) => c.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({ name: "", email: "", phone: "", active: true, gender: "male" });
        setShowForm(false);
      }
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      active: customer.active,
      gender: customer.gender || "male",
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", phone: "", active: true, gender: "male" });
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #f9fafb;
          }
          .btn-earth {
            background: linear-gradient(135deg, #a0522d, #d2b48c);
            color: white;
            transition: background 0.3s ease;
            padding: 12px 24px;
            border-radius: 0.5rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
          }
          .btn-earth:hover {
            background: linear-gradient(135deg, #8b4513, #c7a17a);
          }
          .btn-emerald {
            background: linear-gradient(135deg, #047857, #10b981);
            color: white;
            transition: background 0.3s ease;
            padding: 8px 16px;
            border-radius: 0.5rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
          }
          .btn-emerald:hover {
            background: linear-gradient(135deg, #065f46, #059669);
          }
          .btn-rose {
            background: linear-gradient(135deg, #be185d, #f43f5e);
            color: white;
            transition: background 0.3s ease;
            padding: 8px 16px;
            border-radius: 0.5rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
          }
          .btn-rose:hover {
            background: linear-gradient(135deg, #9d174d, #e11d48);
          }
        `}
      </style>

      <h1 className="text-4xl font-semibold mb-8 text-[#5A3E36]">Management Pelanggan</h1>

      <div className="flex mb-8">
        <button
          onClick={() => {
            if (showForm) handleCancel();
            else setShowForm(true);
          }}
          className="btn-earth"
        >
          {showForm ? "Batal" : "Tambah Pelanggan"}
        </button>
      </div>

      {showForm && (
        <div className="max-w-md mx-auto mb-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-[#5A3E36]">{editingId ? "Edit Pelanggan" : "Tambah Pelanggan"}</h2>
          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-2 text-gray-600">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                placeholder="Nama pelanggan"
              />
            </div>
            <div>
              <label className="block font-medium mb-2 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                placeholder="Email pelanggan"
              />
            </div>
            <div>
              <label className="block font-medium mb-2 text-gray-600">Telepon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
                placeholder="Nomor telepon"
              />
            </div>
            <div>
              <label className="block font-medium mb-2 text-gray-600">Jenis Kelamin</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
              >
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                id="activeCheckbox"
                className="w-5 h-5 rounded border-gray-300 focus:ring-[#C19A6B]"
              />
              <label htmlFor="activeCheckbox" className="font-medium text-gray-700">
                Aktif
              </label>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              {editingId && (
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>
              )}
              <button
                onClick={handleAddCustomer}
                className="btn-emerald"
              >
                {editingId ? "Update" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {customers.length === 0 && (
          <p className="col-span-full text-center text-gray-500 text-lg">Tidak ada data pelanggan</p>
        )}
        {customers.map((cust) => (
          <div
            key={cust.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition"
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold ${getAvatarColor(
                cust.gender,
                cust.active
              )}`}
              title={cust.name}
            >
              {getInitials(cust.name)}
            </div>
            <h3 className="text-xl font-semibold text-[#5A3E36]">{cust.name}</h3>
            <p className="text-gray-600">{cust.email}</p>
            <p className="text-gray-600">{cust.phone}</p>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                cust.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {cust.active ? "Aktif" : "Tidak Aktif"}
            </span>
            <div className="flex space-x-5 mt-4">
              <button
                onClick={() => handleEdit(cust)}
                className="btn-earth"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cust.id)}
                className="btn-rose"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}