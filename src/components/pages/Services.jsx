import React from "react";

export default function Services() {
  const selectedBank = "BIDV";
  const accountNumber = "1800773748";
  const amount = 150000;

  const generateQRUrl = () => {
    return `https://img.vietqr.io/image/${selectedBank}-${accountNumber}-compact2.png?amount=${amount}`;
  };

  const handleConfirmPayment = () => {
    alert("Cảm ơn bạn đã thanh toán!");
  };

  return (
    <div
      style={{
        minHeight: "20vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>
          Quét mã để thanh toán
        </h2>

        <img
          src={generateQRUrl()}
          alt="QR Code"
          style={{
            display: "block",
            margin: "0 auto 20px",
            maxWidth: "300px",
            width: "100%",
            height: "auto",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleConfirmPayment}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(to right, #00c6ff, #0072ff)",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Xác nhận đã thanh toán
        </button>
      </div>
    </div>
  );
}
