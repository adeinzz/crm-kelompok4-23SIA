import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function FAQUser() {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFAQ();

    const interval = setInterval(() => {
      fetchFAQ();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFAQ = async () => {
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setFaqData(data);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-12 font-sans text-[#5A3E36]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-[#B38E66]">
          FAQ - Pertanyaan Umum
        </h1>

        {/* List FAQ */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
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
                <div className="px-6 pb-4 pt-2 text-[#5A3E36] bg-white">
                  <p>{item.answer}</p>
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
