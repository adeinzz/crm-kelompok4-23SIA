import React, { useState } from 'react'
import { CheckCircle, Clock, XCircle, MessageCircleReply } from 'lucide-react'

export default function CaseManagement() {
  const [cases, setCases] = useState([
    {
      id: 1,
      nama: 'Lidya Rahmawati',
      email: 'lidya@example.com',
      kategori: 'Komplain',
      pesan: 'Barang datang terlambat dan kemasan rusak.',
      status: 'pending',
      balasan: '',
    },
    {
      id: 2,
      nama: 'Rina Kusuma',
      email: 'rina@example.com',
      kategori: 'Pertanyaan',
      pesan: 'Apakah produk A akan restock bulan ini?',
      status: 'selesai',
      balasan: 'Produk A akan restock minggu depan.',
    },
    {
      id: 3,
      nama: 'Dewi Aulia',
      email: 'dewi@example.com',
      kategori: 'Lainnya',
      pesan: 'Saya ingin mengganti alamat pengiriman.',
      status: 'ditolak',
      balasan: '',
    },
  ])

  const [selectedCase, setSelectedCase] = useState(null)
  const [response, setResponse] = useState('')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'selesai':
        return (
          <span className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm">
            <CheckCircle size={16} /> Selesai
          </span>
        )
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1 text-red-500 font-semibold text-sm">
            <XCircle size={16} /> Ditolak
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold text-sm">
            <Clock size={16} /> Pending
          </span>
        )
    }
  }

  const handleSelectCase = (caseData) => {
    setSelectedCase(caseData)
    setResponse(caseData.balasan || '')
  }

  const handleSendResponse = () => {
    const updatedCases = cases.map((c) =>
      c.id === selectedCase.id
        ? { ...c, balasan: response, status: 'selesai' }
        : c
    )
    setCases(updatedCases)
    setSelectedCase(null)
    setResponse('')
  }

  return (
    <div className="p-6 md:ml-64 min-h-screen bg-[#fdf9f6] font-[Poppins]">
      <h1
        className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Kelola Case Management
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden text-[#5A3E36] text-sm">
          <thead className="bg-[#B38E66] text-white" style={{ fontFamily: "'Georgia', serif" }}>
            <tr>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Kategori</th>
              <th className="py-3 px-6 text-left">Pesan & Balasan</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-[#fdf3ea] transition duration-150 align-top"
              >
                <td className="py-4 px-6">{c.nama}</td>
                <td className="py-4 px-6">{c.email}</td>
                <td className="py-4 px-6">{c.kategori}</td>
                <td className="py-4 px-6">
                  <p><strong>Pesan:</strong> {c.pesan}</p>
                  {c.balasan && (
                    <p className="mt-2 text-sm text-green-700">
                      <strong>Balasan Admin:</strong> {c.balasan}
                    </p>
                  )}
                </td>
                <td className="py-4 px-6">{getStatusBadge(c.status)}</td>
                <td className="py-4 px-6">
                  {c.status !== 'selesai' && (
                    <button
                      onClick={() => handleSelectCase(c)}
                      className="flex items-center gap-1 text-[#5A3E36] hover:text-[#a17a54] transition text-sm"
                    >
                      <MessageCircleReply size={16} /> Balas
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md text-sm text-[#5A3E36]">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Balas Pesan dari {selectedCase.nama}
          </h2>
          <p className="mb-1"><strong>Email:</strong> {selectedCase.email}</p>
          <p className="mb-4"><strong>Pesan:</strong> {selectedCase.pesan}</p>
          <textarea
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-[#B38E66] focus:ring-1 focus:ring-[#B38E66]"
            placeholder="Tulis balasan di sini..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          ></textarea>
          <button
            onClick={handleSendResponse}
            className="mt-4 px-6 py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a17a54] transition font-semibold"
          >
            Kirim Balasan
          </button>
        </div>
      )}
    </div>
  )
}
