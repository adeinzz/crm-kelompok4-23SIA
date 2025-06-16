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
          <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm">
            <CheckCircle size={16} /> Selesai
          </span>
        )
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1 text-red-500 font-medium text-sm">
            <XCircle size={16} /> Ditolak
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 text-yellow-600 font-medium text-sm">
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
    <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Case Management
      </h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-[#e3d5c4]">
        <table className="min-w-full divide-y divide-[#e8dccd] text-sm">
          <thead className="bg-[#fef9f5]">
            <tr>
              <th className="py-3 px-5 text-left text-[#5A3E36] font-semibold">Nama</th>
              <th className="py-3 px-5 text-left text-[#5A3E36] font-semibold">Email</th>
              <th className="py-3 px-5 text-left text-[#5A3E36] font-semibold">Kategori</th>
              <th className="py-3 px-5 text-left text-[#5A3E36] font-semibold">Pesan & Balasan</th>
              <th className="py-3 px-5 text-left text-[#5A3E36] font-semibold">Status</th>
              <th className="py-3 px-5 text-center text-[#5A3E36] font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd] text-base">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-[#fcf4eb] align-top">
                <td className="py-4 px-5">{c.nama}</td>
                <td className="py-4 px-5">{c.email}</td>
                <td className="py-4 px-5">{c.kategori}</td>
                <td className="py-4 px-5">
                  <p><strong>Pesan:</strong> {c.pesan}</p>
                  {c.balasan && (
                    <p className="mt-2 text-sm text-green-700">
                      <strong>Balasan Admin:</strong> {c.balasan}
                    </p>
                  )}
                </td>
                <td className="py-4 px-5">{getStatusBadge(c.status)}</td>
                <td className="py-4 px-5 text-center">
                  {c.status !== 'selesai' && (
                    <button
                      onClick={() => handleSelectCase(c)}
                      className="flex items-center justify-center gap-1 text-[#A0522D] hover:text-[#7c5030] transition text-sm font-semibold"
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
        <div className="mt-10 p-6 bg-white rounded-2xl shadow-lg text-sm text-[#5A3E36] border border-[#e3d5c4]">
          <h2 className="text-xl font-bold mb-4 text-[#A0522D]">Balas Pesan</h2>
          <p className="mb-1"><strong>Nama:</strong> {selectedCase.nama}</p>
          <p className="mb-1"><strong>Email:</strong> {selectedCase.email}</p>
          <p className="mb-4"><strong>Pesan:</strong> {selectedCase.pesan}</p>
          <textarea
            rows="4"
            className="w-full p-4 border border-[#e0cfc1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B38E66] text-[#5A3E36]"
            placeholder="Tulis balasan di sini..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          ></textarea>
          <button
            onClick={handleSendResponse}
            className="mt-4 px-6 py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a07a54] font-semibold transition"
          >
            Kirim Balasan
          </button>
        </div>
      )}
    </div>
  )
}