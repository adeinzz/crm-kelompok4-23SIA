import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function LoyaltyManagement() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("customername, total");

    if (error) {
      console.error(error);
      return;
    }

    const totals = {};
    data.forEach((row) => {
      if (!totals[row.customername]) {
        totals[row.customername] = 0;
      }
      totals[row.customername] += parseFloat(row.total);
    });

    const customersArr = Object.keys(totals).map((name, index) => {
      const totalBelanja = totals[name];
      return {
        id: index + 1,
        name,
        totalBelanja,
        points: Math.floor(totalBelanja / 10000),
        loyalty: getLoyaltyLevel(totalBelanja),
      };
    });

    setCustomers(customersArr);

    // Save or update to Supabase loyalty table
    for (const customer of customersArr) {
      const email = generateEmail(customer.name);
      await supabase
        .from("loyalty")
        .upsert(
          {
            user_email: email,
            tier: customer.loyalty,
            points: customer.points,
            total_belanja: customer.totalBelanja,
          },
          { onConflict: ["user_email"] }
        );
    }
  };

  const getLoyaltyLevel = (total) => {
    if (total >= 7000000) return "Platinum";
    if (total >= 3000000) return "Gold";
    if (total >= 1000000) return "Silver";
    return "Bronze";
  };

  const generateEmail = (name) => {
    return name.toLowerCase().replace(/\s+/g, ".") + "@example.com";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-[#5A3E36] font-sans bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Loyalty Management Pelanggan
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl border border-[#e0cfc1]">
        <table className="min-w-full divide-y divide-[#e0cfc1]">
          <thead className="bg-[#fdf7f2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#5A3E36] uppercase">
                Nama
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-[#5A3E36] uppercase">
                Total Belanja
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Poin
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-[#5A3E36] uppercase">
                Loyalty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f3e8dd]">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-[#f9f4ee]">
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4 text-right">
                  {formatCurrency(c.totalBelanja)}
                </td>
                <td className="px-6 py-4 text-center">{c.points}</td>
                <td className="px-6 py-4 text-center font-semibold">
                  {c.loyalty}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-[#B38E66] italic"
                >
                  Belum ada data loyalty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}
