import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'

// Simulasi daftar pelanggan
const daftarEmailPelanggan = [
  'lidya@example.com',
  'rina@example.com',
  'dewi@example.com',
  'manager1@company.com',
  'marketing@company.com',
]

export default function EmailCampaign() {
  const [campaigns, setCampaigns] = useState([])
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [kategori, setKategori] = useState('Promo')

  // For Edit
  const [editId, setEditId] = useState(null)
  const [editJudul, setEditJudul] = useState('')
  const [editIsi, setEditIsi] = useState('')
  const [editKategori, setEditKategori] = useState('Promo')
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchCampaigns()

    const interval = setInterval(() => {
      fetchCampaigns()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('email_campaigns')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setCampaigns(data)
    }
  }

  const handleKirim = async () => {
    if (!judul || !isi) return alert('Judul dan isi email harus diisi.')

    // Simulasi pengiriman email
    daftarEmailPelanggan.forEach((email) => {
      console.log(
        `📤 Email dikirim ke: ${email}\nJudul: ${judul}\nIsi: ${isi}\n---`
      )
    })

    const newCampaign = {
      judul,
      isi,
      kategori,
      tanggal: new Date().toLocaleString(),
    }

    const { error } = await supabase
      .from('email_campaigns')
      .insert([newCampaign])

    if (error) {
      console.error(error)
      alert('Gagal mengirim email.')
    } else {
      setJudul('')
      setIsi('')
      setKategori('Promo')
      alert('Email berhasil dikirim ke seluruh manajemen.')
      fetchCampaigns()
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus campaign ini?')) return

    const { error } = await supabase
      .from('email_campaigns')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      alert('Gagal menghapus campaign.')
    } else {
      alert('Campaign berhasil dihapus.')
      fetchCampaigns()
    }
  }

  const openEditModal = (item) => {
    setEditId(item.id)
    setEditJudul(item.judul)
    setEditIsi(item.isi)
    setEditKategori(item.kategori)
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    if (!editJudul || !editIsi) {
      alert('Judul dan isi tidak boleh kosong.')
      return
    }

    const { error } = await supabase
      .from('email_campaigns')
      .update({
        judul: editJudul,
        isi: editIsi,
        kategori: editKategori,
      })
      .eq('id', editId)

    if (error) {
      console.error(error)
      alert('Gagal update campaign.')
    } else {
      alert('Campaign berhasil diupdate.')
      setShowEditModal(false)
      fetchCampaigns()
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Email Campaign
      </h1>

      {/* Form Campaign */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-[#5A3E36] font-semibold mb-1">
            Judul Email
          </label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
            placeholder="Contoh: Promo Diskon Akhir Tahun!"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#5A3E36] font-semibold mb-1">
            Kategori
          </label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
          >
            <option value="Promo">Promo</option>
            <option value="Newsletter">Newsletter</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-[#5A3E36] font-semibold mb-1">
            Isi Email
          </label>
          <textarea
            rows="6"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
            placeholder="Tulis isi email yang ingin dikirim ke pelanggan..."
          ></textarea>
        </div>
        <button
          onClick={handleKirim}
          className="px-6 py-2 bg-[#B38E66] text-white rounded-md hover:bg-[#a17a54] transition"
        >
          Kirim Email
        </button>
      </div>

      {/* Tabel Campaign */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-[#5A3E36]">
          <thead className="bg-[#B38E66] text-white text-left">
            <tr>
              <th className="py-3 px-6">Judul</th>
              <th className="py-3 px-6">Kategori</th>
              <th className="py-3 px-6">Isi</th>
              <th className="py-3 px-6">Tanggal Kirim</th>
              <th className="py-3 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-[#fdf3ea] transition duration-150 align-top"
              >
                <td className="py-4 px-6 font-semibold">{item.judul}</td>
                <td className="py-4 px-6">{item.kategori}</td>
                <td className="py-4 px-6">{item.isi}</td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {item.tanggal}
                </td>
                <td className="py-4 px-6 space-x-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-bold text-[#5A3E36] mb-4">
              Edit Email Campaign
            </h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Judul</label>
              <input
                type="text"
                value={editJudul}
                onChange={(e) => setEditJudul(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Kategori</label>
              <select
                value={editKategori}
                onChange={(e) => setEditKategori(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
              >
                <option value="Promo">Promo</option>
                <option value="Newsletter">Newsletter</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Isi</label>
              <textarea
                rows="5"
                value={editIsi}
                onChange={(e) => setEditIsi(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#B38E66] text-white rounded hover:bg-[#a17a54]"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
