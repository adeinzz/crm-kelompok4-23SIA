import React, { useState } from "react";

export default function FAQ() {
  const [faqData, setFaqData] = useState([
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
  ]);

  const [openIndex, setOpenIndex] = useState(null);
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
  const [editIndex, setEditIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setNewFAQ({ ...newFAQ, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newFAQ.question && newFAQ.answer) {
      setFaqData([...faqData, newFAQ]);
      setNewFAQ({ question: "", answer: "" });
    }
  };

  const handleDelete = (index) => {
    const updated = faqData.filter((_, i) => i !== index);
    setFaqData(updated);
    if (openIndex === index) setOpenIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewFAQ(faqData[index]);
  };

  const handleUpdate = () => {
    const updated = [...faqData];
    updated[editIndex] = newFAQ;
    setFaqData(updated);
    setNewFAQ({ question: "", answer: "" });
    setEditIndex(null);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-12 font-sans text-[#5A3E36]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-[#B38E66]">
          FAQ - Pertanyaan Umum
        </h1>

        {/* Form Tambah/Edit */}
        <div className="mb-10 p-6 border border-[#e0cfc1] rounded-2xl bg-white shadow-md space-y-4">
          <input
            type="text"
            name="question"
            value={newFAQ.question}
            onChange={handleChange}
            placeholder="Masukkan Pertanyaan"
            className="w-full px-4 py-2 border border-[#e0cfc1] rounded focus:outline-none focus:ring-2 focus:ring-[#B38E66]"
          />
          <textarea
            name="answer"
            value={newFAQ.answer}
            onChange={handleChange}
            placeholder="Masukkan Jawaban"
            className="w-full px-4 py-2 border border-[#e0cfc1] rounded focus:outline-none focus:ring-2 focus:ring-[#B38E66]"
          />
          <button
            onClick={editIndex !== null ? handleUpdate : handleAdd}
            className="px-6 py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a07a54] transition"
          >
            {editIndex !== null ? "Update FAQ" : "Tambah FAQ"}
          </button>
        </div>

        {/* List FAQ */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-[#e0cfc1] rounded-2xl bg-white shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 bg-[#fdf7f2] hover:bg-[#f3e8dd] transition flex justify-between items-center"
              >
                <span className="font-semibold text-lg">{item.question}</span>
                <span className="text-2xl font-bold text-[#B38E66]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2 text-[#5A3E36] bg-white animate-fadeIn">
                  <p>{item.answer}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-4 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {faqData.length === 0 && (
            <div className="text-center py-4 text-[#B38E66] italic">
              Belum ada pertanyaan yang ditambahkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
