import React, { useState } from 'react'

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

  const handleKirim = () => {
    if (!judul || !isi) return alert('Judul dan isi email harus diisi.')

    // Simulasi pengiriman email ke seluruh manajemen
    daftarEmailPelanggan.forEach((email) => {
      console.log(`📤 Email dikirim ke: ${email}\nJudul: ${judul}\nIsi: ${isi}\n---`)
    })

    const newCampaign = {
      id: Date.now(),
      judul,
      isi,
      kategori,
      tanggal: new Date().toLocaleString(),
    }

    setCampaigns([newCampaign, ...campaigns])
    setJudul('')
    setIsi('')
    setKategori('Promo')
    alert('Email berhasil dikirim ke seluruh manajemen.')
  }

  return (
   <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Email Campaign
      </h1>

      {/* Form Campaign */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-[#5A3E36] font-semibold mb-1">Judul Email</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-[#B38E66]"
            placeholder="Contoh: Promo Diskon Akhir Tahun!"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#5A3E36] font-semibold mb-1">Kategori</label>
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
          <label className="block text-[#5A3E36] font-semibold mb-1">Isi Email</label>
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

      {/* Daftar Campaign Terkirim */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-[#5A3E36]">
          <thead
            className="bg-[#B38E66] text-white text-left"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <tr>
              <th className="py-3 px-6">Judul</th>
              <th className="py-3 px-6">Kategori</th>
              <th className="py-3 px-6">Isi</th>
              <th className="py-3 px-6">Tanggal Kirim</th>
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
                <td className="py-4 px-6 text-sm text-gray-600">{item.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
