import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const ProfileUser = () => {
  const [loyaltyData, setLoyaltyData] = useState(null);
  const userEmail = "putri@gmail.com";

  useEffect(() => {
    fetchLoyaltyFromOrders();
  }, []);

  const fetchLoyaltyFromOrders = async () => {
    // Query semua orders milik Zahra Putri
    const { data, error } = await supabase
      .from("orders")
      .select("customername, total")
      .eq("customername", "Putri");

    if (error) {
      console.error("Error fetching orders:", error);
      return;
    }

    let totalBelanja = 0;
    if (data && data.length > 0) {
      totalBelanja = data.reduce(
        (acc, curr) => acc + parseFloat(curr.total),
        0
      );
    }

    const points = Math.floor(totalBelanja / 10000);
    const loyalty = getLoyaltyLevel(totalBelanja);

    setLoyaltyData({
      totalBelanja,
      points,
      loyalty,
    });
  };

  const getLoyaltyLevel = (total) => {
    if (total >= 7000000) return "Platinum";
    if (total >= 3000000) return "Gold";
    if (total >= 1000000) return "Silver";
    return "Bronze";
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-[#5A3E36] bg-[#fffaf5] min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-[#B38E66] text-center">
        Profil Pengguna
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-[#e0cfc1]">
        <h2 className="text-xl font-bold mb-4 text-[#5A3E36]">Informasi Pribadi</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-semibold">Nama:</div>
          <div>Putri</div>

          <div className="font-semibold">Email:</div>
          <div>{userEmail}</div>

          <div className="font-semibold">Nomor HP:</div>
          <div>0812-3456-7890</div>

          <div className="font-semibold">Alamat:</div>
          <div>Jl. Mawar No. 123, Pekanbaru</div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border border-[#e0cfc1]">
        <h2 className="text-xl font-bold mb-4 text-[#5A3E36]">Loyalitas Pelanggan</h2>

        {loyaltyData ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-semibold">Total Belanja:</div>
            <div>{formatCurrency(loyaltyData.totalBelanja)}</div>

            <div className="font-semibold">Poin Loyalty:</div>
            <div>{loyaltyData.points}</div>

            <div className="font-semibold">Tingkat Loyalty:</div>
            <div className="font-bold text-[#B38E66]">{loyaltyData.loyalty}</div>
          </div>
        ) : (
          <div className="text-center text-[#B38E66] italic">
            Sedang memuat data loyalitas...
          </div>
        )}
      </div>
    </div>
  );
};

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default ProfileUser;
