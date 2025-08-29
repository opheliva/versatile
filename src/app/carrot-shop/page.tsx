"use client";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

// Định nghĩa type cho item
type ShopItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Sample data for shop items
const shopItems: ShopItem[] = [
  { id: 1, name: "Áo sơ mi xanh", price: 100, image: "/shirt.png" },
  { id: 2, name: "Quần yếm", price: 150, image: "/overalls.png" },
  { id: 3, name: "Nón len", price: 80, image: "/beanie.png" },
  { id: 4, name: "Kính râm", price: 120, image: "/sunglasses.png" },
];

export default function CarrotShopPage() {
  const { user, isSignedIn } = useUser();
  const [carrots, setCarrots] = useState<number>(250); // Initial carrots for demonstration
  const [message, setMessage] = useState<string>("");

  const handlePurchase = (item: ShopItem) => {
    if (carrots >= item.price) {
      setCarrots(carrots - item.price);
      setMessage(`Bạn đã mua ${item.name} thành công!`);
    } else {
      setMessage("Bạn không đủ cà rốt để mua món đồ này.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-[#505252] mb-2">Carrot Shop</h1>
        <p className="text-2xl text-[#7ed957] font-semibold">
          Hãy dùng cà rốt để mua trang phục và phụ kiện cho thỏ!
        </p>
      </div>

      <div className="flex justify-between items-center bg-[#fdfcf6] p-4 rounded-md shadow-md mb-8">
        <h2 className="text-3xl font-bold text-[#505252]">
          Cà rốt của bạn: <span className="text-[#ff9900]">{carrots}</span>
        </h2>
        {message && (
          <p className="text-xl font-medium text-center text-green-600">
            {message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-[#fdfcf6] p-6 rounded-lg shadow-lg border border-[#cfd1ce]"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-[#505252] mb-2">
              {item.name}
            </h3>
            <p className="text-2xl font-bold text-[#ff9900] mb-4">
              {item.price} cà rốt
            </p>
            <button
              onClick={() => handlePurchase(item)}
              className="bg-[#7ed957] text-white px-6 py-3 rounded-full font-bold text-xl hover:bg-[#68b849] transition duration-300"
            >
              Mua
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
