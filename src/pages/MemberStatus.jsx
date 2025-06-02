import React, { useState } from 'react';

function RegisterMemberForm({ phone, initialName = '', initialStatus = 'Aktif', onSubmit, onCancel }) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState(initialStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Nama harus diisi!');
    onSubmit({ phone, name: name.trim(), status });
    setName('');
    setStatus('Aktif');
  };

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded-lg bg-white shadow-md max-w-md mx-auto font-sans text-[#333]">
      <h2 className="text-2xl font-semibold mb-6 text-[#5A3E36] text-center">
        {initialName ? 'Edit Member' : 'Form Pendaftaran Member'}
      </h2>

      <p className="mb-4">
        <strong>Nomor HP:</strong> <span className="font-mono">{phone}</span>
      </p>

      <label className="block mb-1 font-medium">Nama Lengkap</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Masukkan nama lengkap"
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
      />

      <label className="block mb-1 font-medium">Status Member</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-6"
      >
        <option value="Aktif">Aktif</option>
        <option value="Nonaktif">Nonaktif</option>
      </select>

      <div className="flex justify-between">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          {initialName ? 'Simpan Perubahan' : 'Daftar Member'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

export default function MemberStatus() {
  const [phone, setPhone] = useState('');
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [membersData, setMembersData] = useState({
    "081234567890": { name: "Sarah Aulia", status: "Aktif" },
    "089876543210": { name: "Ahmad Rizky", status: "Nonaktif" },
  });

  const checkStatus = () => {
    setLoading(true);
    setShowAddForm(false);
    setEditMode(false);
    setMember(null);
    setTimeout(() => {
      const found = membersData[phone];
      setMember(found ? found : { status: "Tidak ditemukan" });
      setLoading(false);
    }, 800);
  };

  const addMember = ({ phone: newPhone, name, status }) => {
    setMembersData({
      ...membersData,
      [newPhone]: { name, status },
    });
    setMember({ name, status });
    setShowAddForm(false);
    setEditMode(false);
  };

  const updateMember = ({ phone: updPhone, name, status }) => {
    setMembersData(prev => ({
      ...prev,
      [updPhone]: { name, status },
    }));
    setMember({ name, status });
    setShowAddForm(false);
    setEditMode(false);
  };

  const deleteMember = (delPhone) => {
    if (!window.confirm('Yakin ingin menghapus member ini?')) return;
    setMembersData(prev => {
      const copy = { ...prev };
      delete copy[delPhone];
      return copy;
    });
    setMember(null);
    setPhone('');
    setShowAddForm(false);
    setEditMode(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 font-sans text-[#333]">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#5A3E36]">
        Cek Status Member dengan No HP
      </h1>

      <input
        type="tel"
        placeholder="Masukkan nomor HP"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        disabled={loading || editMode || showAddForm}
      />

      <button
        onClick={checkStatus}
        disabled={!phone || loading || editMode || showAddForm}
        className="bg-[#5A3E36] hover:bg-[#472e27] text-white px-4 py-2 rounded w-full mb-4 disabled:opacity-50"
      >
        {loading ? "Memeriksa..." : "Cek Status"}
      </button>

      {member && !showAddForm && (
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          {member.name ? (
            <>
              <p><strong>Nama:</strong> {member.name}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={member.status === "Aktif" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {member.status}
                </span>
              </p>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMember(phone)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-600 font-semibold mb-2">Member tidak ditemukan.</p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                >
                  Tambah Member Baru
                </button>
              )}
            </>
          )}
        </div>
      )}

      {(showAddForm || editMode) && (
        <RegisterMemberForm
          phone={phone}
          initialName={editMode ? member?.name : ''}
          initialStatus={editMode ? member?.status : 'Aktif'}
          onSubmit={editMode ? updateMember : addMember}
          onCancel={() => {
            setShowAddForm(false);
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
}
