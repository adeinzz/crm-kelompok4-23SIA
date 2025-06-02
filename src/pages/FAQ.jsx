import React, { useState } from "react";

const faqData = [
  {
    question: "Apa itu Buttonscarves?",
    answer:
      "Buttonscarves adalah brand fashion modest yang menawarkan koleksi hijab, pakaian, dan aksesoris premium dengan desain elegan dan berkualitas tinggi.",
  },
  {
    question: "Bagaimana cara memesan produk Buttonscarves?",
    answer:
      "Anda dapat memesan produk melalui website resmi kami di www.buttonscarves.com atau melalui aplikasi resmi Buttonscarves di perangkat mobile Anda.",
  },
  {
    question: "Apakah Buttonscarves menerima pengembalian barang?",
    answer:
      "Ya, kami menerima pengembalian barang dalam waktu 7 hari setelah barang diterima, dengan syarat barang belum dipakai dan masih dalam kondisi baik.",
  },
  {
    question: "Apakah tersedia pengiriman internasional?",
    answer:
      "Tentu! Buttonscarves melayani pengiriman ke berbagai negara melalui layanan ekspedisi terpercaya.",
  },
  {
    question: "Bagaimana saya mengetahui koleksi terbaru?",
    answer:
      "Ikuti akun Instagram resmi kami @buttonscarves dan berlangganan newsletter kami untuk mendapatkan informasi koleksi terbaru, promosi, dan event eksklusif.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans text-[#333]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
          body {
            font-family: 'Poppins', sans-serif;
            background-color: #fdfaf7;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>

      <h1 className="text-4xl font-bold mb-8 text-center text-[#5A3E36]">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50 transition flex justify-between items-center"
            >
              <span className="font-medium text-lg">{item.question}</span>
              <span className="text-xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 animate-fadeIn">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
