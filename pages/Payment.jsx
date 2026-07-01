import { useState } from "react";

export default function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [utr, setUtr] = useState("");
  const [status, setStatus] = useState("");

  async function submitPayment() {
    if (!utr) return alert("Enter UTR number");

    const res = await fetch("http://127.0.0.1:5000/api/payment/upi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, utr }),
    });

    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        💳 Upgrade to Pro (UPI Payment)
      </h1>

      {/* UPI QR SECTION */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-bold">Scan & Pay</h2>

        <p className="mt-2">
          UPI ID: <b>resumeai@ybl</b>
        </p>

        <p>Amount: ₹199 (Lifetime Pro)</p>

        <div className="mt-3 p-6 bg-gray-200 text-center">
          📷 QR CODE PLACEHOLDER
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow">
        <input
          placeholder="Your Name"
          className="w-full p-2 border mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-2 border mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="UTR Number (from UPI app)"
          className="w-full p-2 border mb-2"
          onChange={(e) => setUtr(e.target.value)}
        />

        <button onClick={submitPayment}>
          Submit Payment
        </button>

        {status && (
          <p className="mt-3 text-green-600">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
