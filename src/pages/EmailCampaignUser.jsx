import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function EmailCampaignUser() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    fetchCampaigns()
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf5] to-[#f5e9dd] p-8">
      <h1 className="text-4xl font-bold text-center text-[#B38E66] mb-10">
        📧 Email Campaigns for You
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-[#f0e5d8]"
          >
            <span className="text-sm text-white bg-[#B38E66] px-3 py-1 rounded-full inline-block mb-3">
              {item.kategori}
            </span>
            <h2 className="text-xl font-bold text-[#5A3E36] mb-3">
              {item.judul}
            </h2>
            <p className="text-[#5A3E36] mb-4 whitespace-pre-line">
              {item.isi.length > 150
                ? item.isi.substring(0, 150) + '...'
                : item.isi}
            </p>
            <div className="text-right text-gray-500 text-xs">
              Dikirim pada: {item.tanggal}
            </div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Belum ada campaign email untuk ditampilkan.
        </p>
      )}
    </div>
  )
}
