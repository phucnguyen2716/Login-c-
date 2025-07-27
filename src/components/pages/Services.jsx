import React, { useState } from 'react';

const BANKS = [
  { name: "MB Bank", code: "MB" },
  { name: "ACB", code: "ACB" },
  { name: "TPBank", code: "TPB" },
  { name: "Techcombank", code: "TCB" },
  { name: "VPBank", code: "VPB" },
  { name: "VietinBank", code: "CTG" },
  { name: "Vietcombank", code: "VCB" },
  { name: "Sacombank", code: "STB" },
  { name: "BIDV", code: "BIDV" },
];

export default function Services() {
  const [selectedBank, setSelectedBank] = useState(BANKS[0].code);
  const [amount, setAmount] = useState(150000);
  const [showQR, setShowQR] = useState(false);

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const handlePay = () => {
    setShowQR(true);
  };

  const handleClose = () => {
    setShowQR(false);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Thanh toán dịch vụ</h1>

      <label className="block mb-2 font-medium">Chọn ngân hàng:</label>
      <select
        value={selectedBank}
        onChange={handleBankChange}
        className="w-full p-2 border rounded mb-4"
      >
        {BANKS.map((bank) => (
          <option key={bank.code} value={bank.code}>
            {bank.name}
          </option>
        ))}
      </select>

      <p className="mb-4">Số tiền: <strong>{amount.toLocaleString()} VND</strong></p>

      <button
        onClick={handlePay}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thanh toán
      </button>

      {/* QR Popup Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Quét mã để thanh toán</h2>
            <img
              src="https://api.vietqr.io/image/970422-201123456789-AGRIbank.png?amount=150000&addInfo=Payment"
              alt="VietQR Code"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
