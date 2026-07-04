import { useState } from "react";
import API from "../services/api";

export default function Upgrade() {
  const [utr, setUtr] = useState("");
  const [step, setStep] = useState(1);

  async function startPayment() {
    const res = await API.post("/payment/upi-request");

    alert(`Pay ₹${res.data.amount} to ${res.data.upiId}`);
    setStep(2);
  }

  async function submitUtr() {
    await API.post("/payment/verify-utr", { utr });

    alert("Submitted for verification");
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>💰 Upgrade to Pro</h2>

      {step === 1 && (
        <button onClick={startPayment}>Pay via UPI</button>
      )}

      {step === 2 && (
        <>
          <p>Enter UTR after payment:</p>
          <input value={utr} onChange={(e) => setUtr(e.target.value)} />
          <button onClick={submitUtr}>Submit</button>
        </>
      )}
    </div>
  );
}
