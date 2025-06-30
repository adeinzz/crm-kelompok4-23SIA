import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const DashboardUser = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Dashboard").select("*");
    if (error) console.error(error);
    else setProducts(data);
  };

  return (
    <div className="bg-[#fef7f1] min-h-screen pb-12">
      {/* Banner */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src="src/assets/Banner.png"
          alt="Banner Promo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
            Selamat Datang di Buttonscarves
          </h1>
        </div>
      </div>

      {/* Shop by Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-[#5A3E36] text-2xl font-semibold mb-8">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Scarves", image: "https://www.buttonscarves.com/cdn/shop/files/categories-1-bsh.jpg?v=1736233580&width=1080" },
            { label: "Bags", image: "https://www.buttonscarves.com/cdn/shop/files/categories-3-bsh.jpg?v=1736233580&width=1080" },
            { label: "Apparel", image: "https://www.buttonscarves.com/cdn/shop/files/categories-2-bsh.jpg?v=1736233580&width=1080" },
            { label: "Accessories", image: "https://www.buttonscarves.com/cdn/shop/files/categories-5-bsh.jpg?v=1736233580&width=1080" },
            { label: "Footwear", image: "https://www.buttonscarves.com/cdn/shop/files/categories-4-bsh.jpg?v=1736233580&width=1080" },
            { label: "Prayer Set", image: "https://www.buttonscarves.com/cdn/shop/files/categories-6-bsh.jpg?v=1736233580&width=1080" },
            { label: "Home & Living", image: "https://www.buttonscarves.com/cdn/shop/files/categories-7-bsh.jpg?v=1736233580&width=1080" },
            { label: "Shop All", image: "https://www.buttonscarves.com/cdn/shop/files/categories-8-bsh.jpg?v=1736233580&width=1080" },
          ].map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-[#5A3E36] hover:scale-105 transition"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-28 h-28 object-cover rounded-full mb-2 border border-[#e0cfc1]"
              />
              <span className="text-sm font-medium">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Produk dari Supabase */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#5A3E36] mb-6">
          Produk Terbaru
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#e0cfc1] rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 md:h-56 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="font-semibold text-[#5A3E36] text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-[#B38E66] font-bold">
                  Rp {Number(product.price).toLocaleString()}
                </p>
                <button className="mt-4 w-full py-2 bg-[#B38E66] text-white rounded-full hover:bg-[#a37f58] transition">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Galeri Tambahan */}
<section className="max-w-7xl mx-auto px-4 mt-16">
  <h2 className="text-2xl font-bold text-[#5A3E36] mb-6 text-center">
    Koleksi Buttonscarves
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {[
      "https://www.buttonscarves.com/cdn/shop/files/2_d20dffff-3ed4-4a20-bfc8-c2bfc4243a34.jpg?v=1750143361&width=1200",
      "https://www.buttonscarves.com/cdn/shop/files/bone_1.jpg?v=1744179363&width=1200",
      "https://www.buttonscarves.com/cdn/shop/files/BimuStileto-Black3.jpg?v=1744706816&width=1200",
      "https://www.buttonscarves.com/cdn/shop/files/00COVER_5abb9b98-6557-4b84-a25c-fd6876ac02c0.jpg?v=1750068400&width=1200",
      "https://www.buttonscarves.com/cdn/shop/files/PlaidKnitShirt-Oak.jpg?v=1745902279&width=1200",
      "https://www.buttonscarves.com/cdn/shop/files/DEUXOVALPLUM-1.jpg?v=1741684077&width=1200",
    ].map((img, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl group hover:ring-4 hover:ring-[#B38E66] transition duration-300"
      >
        <div className="aspect-square">
          <img
            src={img}
            alt={`Galeri ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </div>
    ))}
  </div>
</section>


       {/* Follow Us */}
      <section className="text-center mt-16 text-[#5A3E36]">
        <h2 className="text-lg font-bold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6 text-2xl">
          <a href="https://www.instagram.com/accounts/login/?next=%2Fbuttonscarves%2F&source=omni_redirect"><FaInstagram /></a>
          <a href="https://www.facebook.com/buttonscarves.id/"><FaFacebook /></a>
          <a href="https://www.tiktok.com/@buttonscarves?lang=en"><FaTiktok /></a>
          <a href="https://www.youtube.com/channel/UCy95k5CvLlizRHgeKXBhlzQ"><FaYoutube /></a>
        </div>
      </section>
    </div>
  );
};

export default DashboardUser;
