import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("register")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data:", error);
    } else {
      // register tidak punya kolom status → tambahkan default "Aktif"
      const transformed = data.map((row) => ({
        ...row,
        status: "Aktif",
      }));
      setContacts(transformed);
    }
  };

  return (
    <div className="p-6 max-w-10xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Manajemen Kontak Pelanggan
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-[#e0cfc1]">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Telepon
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      contact.status === "Aktif"
                        ? "text-green-800 bg-green-100"
                        : "text-gray-600 bg-gray-200"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-[#B38E66] italic">
                  Belum ada pelanggan terdaftar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
