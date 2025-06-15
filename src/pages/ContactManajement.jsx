import React, { useState, useEffect } from "react";

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Aktif",
  });

  useEffect(() => {
    const dummyContacts = [
      { id: 1, name: "Andi Pratama", email: "andi@mail.com", phone: "081234560001", status: "Aktif" },
      { id: 2, name: "Budi Santoso", email: "budi@mail.com", phone: "081234560002", status: "Tidak Aktif" },
      { id: 3, name: "Citra Lestari", email: "citra@mail.com", phone: "081234560003", status: "Aktif" },
      { id: 4, name: "Dewi Anggraini", email: "dewi@mail.com", phone: "081234560004", status: "Aktif" },
      { id: 5, name: "Eko Nugroho", email: "eko@mail.com", phone: "081234560005", status: "Tidak Aktif" },
      { id: 6, name: "Fajar Hidayat", email: "fajar@mail.com", phone: "081234560006", status: "Aktif" },
      { id: 7, name: "Gita Permata", email: "gita@mail.com", phone: "081234560007", status: "Tidak Aktif" },
      { id: 8, name: "Hendra Wijaya", email: "hendra@mail.com", phone: "081234560008", status: "Aktif" },
      { id: 9, name: "Intan Sari", email: "intan@mail.com", phone: "081234560009", status: "Aktif" },
      { id: 10, name: "Joko Susanto", email: "joko@mail.com", phone: "081234560010", status: "Tidak Aktif" }
    ];
    setContacts(dummyContacts);
  }, []);

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
      };
      setContacts([...contacts, newContact]);
    }

    setFormData({ name: "", email: "", phone: "", status: "Aktif" });
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

  return (
    <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Manajemen Kontak Pelanggan
      </h1>

      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setFormData({ name: "", email: "", phone: "", status: "Aktif" });
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
          <div className="mb-4">
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#e0cfc1] rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
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
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">Status</th>
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
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      contact.status === "Aktif"
                        ? "text-green-800 bg-green-100"
                        : "text-gray-600 bg-gray-200"
                    }`}
                  >
                    {contact.status}
                  </span>
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
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-[#B38E66] italic">
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
