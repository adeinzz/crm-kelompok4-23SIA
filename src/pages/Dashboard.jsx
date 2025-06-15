import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaMoneyBillWave, FaBoxOpen, FaUsers, FaStar } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardButtonscarves = () => {
  const [mode, setMode] = useState("bulan");

  const penjualanBulanan = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Penjualan Bulanan (juta Rp)",
        data: [150, 180, 220, 260, 300, 350],
        backgroundColor: "#B38E66",
        borderRadius: 6,
      },
    ],
  };

  const penjualanMingguan = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Penjualan Mingguan (juta Rp)",
        data: [25, 30, 28, 35, 33, 40, 38],
        backgroundColor: "#5A3E36",
        borderRadius: 6,
      },
    ],
  };

  const pelangganData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [200, 260, 310, 400, 520, 640],
        fill: true,
        backgroundColor: "rgba(179, 142, 102, 0.2)",
        borderColor: "#B38E66",
        tension: 0.3,
      },
    ],
  };

  const kategoriProduk = {
    labels: ["Hijab", "Outerwear", "Scarf", "Bag"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#5A3E36", "#B38E66", "#f3e8dd", "#e0cfc1"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-[#fef7f1] to-[#fdf7f2] min-h-screen p-8 text-[#5A3E36] font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-[#B38E66]">
        Dashboard Buttonscarves
      </h1>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md hover:shadow-xl transition-all flex items-center space-x-4">
          <FaMoneyBillWave className="text-[#B38E66] text-3xl" />
          <div>
            <p className="text-sm text-[#5A3E36]">Total Penjualan</p>
            <h2 className="text-2xl font-bold">Rp 2.350.000</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md hover:shadow-xl transition-all flex items-center space-x-4">
          <FaBoxOpen className="text-[#5A3E36] text-3xl" />
          <div>
            <p className="text-sm text-[#5A3E36]">Produk Aktif</p>
            <h2 className="text-2xl font-bold">1.240</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md hover:shadow-xl transition-all flex items-center space-x-4">
          <FaUsers className="text-[#B38E66] text-3xl" />
          <div>
            <p className="text-sm text-[#5A3E36]">Pelanggan Setia</p>
            <h2 className="text-2xl font-bold">8.750</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md hover:shadow-xl transition-all flex items-center space-x-4">
          <FaStar className="text-yellow-400 text-3xl" />
          <div>
            <p className="text-sm text-[#5A3E36]">Rating Rata-rata</p>
            <h2 className="text-2xl font-bold text-yellow-500">4.8 ★</h2>
          </div>
        </div>
      </div>

      {/* SWITCH PERFORMA */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 ${
            mode === "minggu"
              ? "bg-[#B38E66] text-white"
              : "bg-white border border-[#B38E66] text-[#B38E66]"
          }`}
          onClick={() => setMode("minggu")}
        >
          Performa Minggu Ini
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 ${
            mode === "bulan"
              ? "bg-[#B38E66] text-white"
              : "bg-white border border-[#B38E66] text-[#B38E66]"
          }`}
          onClick={() => setMode("bulan")}
        >
          Performa Bulan Ini
        </button>
      </div>

      {/* GRAFIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {mode === "minggu" ? "Penjualan Mingguan" : "Penjualan Bulanan"}
          </h3>
          <Bar data={mode === "minggu" ? penjualanMingguan : penjualanBulanan} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md">
          <h3 className="text-lg font-semibold mb-4">Pertumbuhan Pelanggan</h3>
          <Line data={pelangganData} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md">
          <h3 className="text-lg font-semibold mb-4">Kategori Produk Terlaris</h3>
          <Pie data={kategoriProduk} />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e0cfc1] shadow-md">
          <h3 className="text-lg font-semibold mb-4">Detail Penjualan</h3>
          <p className="text-sm text-[#5A3E36] leading-relaxed">
            Produk hijab masih menjadi andalan utama Buttonscarves dengan kontribusi sebesar 40% terhadap total penjualan. Outerwear menduduki peringkat kedua dengan 25%, disusul scarf 20%, dan tas 15%. Trend ini menunjukkan bahwa pelanggan masih sangat antusias terhadap produk fashion modest yang elegan dan fungsional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardButtonscarves;
