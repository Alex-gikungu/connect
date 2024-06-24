// src/components/QRCodeScanner.jsx
import React from "react";
import QrScanner from "react-qr-scanner";
import "./QRCodeScanner.css";

const QRCodeScanner = ({ onScan }) => {
  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="qr-scanner-container">
      <QrScanner
        className="qr-scanner"
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};

export default QRCodeScanner;
