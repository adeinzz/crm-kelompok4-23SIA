import React, { useState, useEffect } from "react";

export default function LoyaltyManagement() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    transactionHistory: [],
  });

  useEffect(() => {
    const dummyContacts = [
      {
        id: 1,
        name: "Andi Pratama",
        email: "andi@mail.com",
        phone: "081234560001",
        transactionHistory: [100000, 250000, 200000],
      },
      {
        id: 2,
        name: "Budi Santoso",
        email: "budi@mail.com",
        phone: "081234560002",
        transactionHistory: [1000000, 1200000],
      },
      {
        id: 3,
        name: "Citra Lestari",
        email: "citra@mail.com",
        phone: "081234560003",
        transactionHistory: [3000000, 2000000, 1000000],
      },
    ];
    setContacts(dummyContacts);
  }, []);

  const getTotalTransaction = (history) =>
    history.reduce((sum, val) => sum + val, 0);

  const calculatePoints = (history) =>
    Math.floor(getTotalTransaction(history) / 10000);

  const getLoyaltyStatus = (history) => {
    const total = getTotalTransaction(history);
    if (total > 7000000) return "Platinum";
    if (total >= 3000000) return "Gold";
    if (total >= 1000000) return "Silver";
    return "Bronze";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateContact = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Semua kolom harus diisi");
      return;
    }

    if (editId !== null) {
      setContacts(
        contacts.map((c) =>
          c.id === editId ? { ...c, ...formData } : c
        )
      );
    } else {
      const newContact = {
        ...formData,
        id: contacts.length + 1,
        transactionHistory: [],
      };
      setContacts([...contacts, newContact]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      transactionHistory: [],
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditId(contact.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data pelanggan ini?")) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleAddTransaction = (id) => {
    const nominal = prompt("Masukkan nominal transaksi (Rp):");
    const amount = parseInt(nominal);
    if (isNaN(amount) || amount <= 0) {
      alert("Nominal transaksi tidak valid.");
      return;
    }

    setContacts(
      contacts.map((c) =>
        c.id === id
          ? {
              ...c,
              transactionHistory: [...(c.transactionHistory || []), amount],
            }
          : c
      )
    );
  };

  return (
    <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Loyalty Management Pelanggan
      </h1>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setFormData({
              name: "",
              email: "",
              phone: "",
              transactionHistory: [],
            });
            setEditId(null);
          }}
          className={`mb-6 px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 ${
            showForm
              ? "bg-[#5A3E36] text-white"
              : "bg-white border border-[#B38E66] text-[#B38E66]"
          }`}
        >
          {showForm ? "Batal" : "Tambah Pelanggan"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 border border-[#e0cfc1] rounded-2xl bg-white shadow-md">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Masukkan nama pelanggan"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Masukkan email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">No. Telepon</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
              placeholder="Contoh: 081234567890"
            />
          </div>

          <button
            onClick={handleAddOrUpdateContact}
            className="px-6 py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a07a54]"
          >
            {editId !== null ? "Update Pelanggan" : "Simpan Pelanggan"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-[#e0cfc1]">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">Telepon</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Poin</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Loyalty</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4 text-center">
                  {calculatePoints(contact.transactionHistory)}
                </td>
                <td className="px-6 py-4 text-center font-semibold">
                  {getLoyaltyStatus(contact.transactionHistory)}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Hapus
                  </button>
                  <button
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                    onClick={() => handleAddTransaction(contact.id)}
                  >
                    +Transaksi
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-[#B38E66] italic">
                  Belum ada pelanggan terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
