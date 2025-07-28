import React from "react";
import './QRBanking.css';

export default function QRBanking() {
  const selectedBank = "BIDV";
  const accountNumber = "1800773748";
  const accountName = "Nguyễn Hoàng Phúc";
  const bankName = "Ngân hàng BIDV";
  const amount = 10000;

  const generateQRUrl = () => {
    return `https://img.vietqr.io/image/${selectedBank}-${accountNumber}-compact2.png?amount=${amount}`;
  };

  return (
<div className="flex justify-center pb-8" style={{ paddingTop: "25px" }}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md px-6 py-8 w-[280px] h-[300px] text-center mx-auto">
        <h2 className="text-sm mb-10 text-center">
          <span className="blue-gradient_text drop-shadow strong-title">
            Đóng góp để dự án tiến xa hơn
          </span>
        </h2>

        <img
          src={generateQRUrl()}
          alt="QR Code"
          className="mx-auto h-auto important-max-w-180"
        />
      </div>
    </div>
  );
}
