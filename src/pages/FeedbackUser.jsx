import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function FeedbackForm() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    kategori: '',
    pesan: '',
  })

  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchFeedbacks()

    const interval = setInterval(() => {
      fetchFeedbacks()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error(error)
    } else {
      setMessages(data)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!form.nama || !form.email || !form.kategori || !form.pesan) {
      alert('Semua field wajib diisi.')
      return
    }

    const { error } = await supabase.from('cases').insert([
      {
        nama: form.nama,
        email: form.email,
        kategori: form.kategori,
        pesan: form.pesan,
      },
    ])

    if (error) {
      console.error(error)
      alert('Gagal kirim feedback.')
    } else {
      alert('Feedback berhasil dikirim.')
      setForm({ nama: '', email: '', kategori: '', pesan: '' })
      fetchFeedbacks()
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#B38E66]">
        Kirim Feedback
      </h1>

      <div className="bg-white p-6 rounded-xl shadow border border-[#e3d5c4]">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border border-[#e0cfc1] px-4 py-2 rounded"
            placeholder="Nama Anda"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#e0cfc1] px-4 py-2 rounded"
            placeholder="Email Anda"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Kategori</label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="w-full border border-[#e0cfc1] px-4 py-2 rounded"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Komplain">Komplain</option>
            <option value="Pertanyaan">Pertanyaan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Pesan</label>
          <textarea
            name="pesan"
            rows="4"
            value={form.pesan}
            onChange={handleChange}
            className="w-full border border-[#e0cfc1] px-4 py-2 rounded"
            placeholder="Tulis pesan Anda..."
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#B38E66] text-white px-6 py-2 rounded-full hover:bg-[#a07a54]"
        >
          Kirim
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#B38E66]">Riwayat Feedback</h2>
        {messages.length === 0 && (
          <p className="text-[#B38E66] italic">Belum ada feedback.</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="mb-4 p-4 border border-[#e3d5c4] rounded-lg bg-white shadow"
          >
            <p>
              <strong>Nama:</strong> {msg.nama}
            </p>
            <p>
              <strong>Email:</strong> {msg.email}
            </p>
            <p>
              <strong>Kategori:</strong> {msg.kategori}
            </p>
            <p>
              <strong>Pesan:</strong> {msg.pesan}
            </p>
            {msg.balasan && (
              <p className="mt-2 text-green-700">
                <strong>Balasan Admin:</strong> {msg.balasan}
              </p>
            )}
            <p className="mt-1 text-sm italic text-gray-600">
              Status: {msg.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
