export const metadata = { title: "Contact Us – DevChallenge Pro" };

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-4">Contact Us</h1>
      <p className="text-[#c7c4d7] mb-12">Have a question, issue, or refund request? Reach out and we'll get back to you within 1–2 business days.</p>

      <div className="space-y-6">
        <div className="bg-[#131b2e] rounded-xl border border-[#464554]/10 p-6 flex items-start gap-4">
          <span className="text-2xl">📧</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#908fa0] mb-1">Email</p>
            <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline font-medium">
              osman.shoaeeb@gmail.com
            </a>
            <p className="text-sm text-[#c7c4d7] mt-1">For billing, refunds, account issues, and general enquiries.</p>
          </div>
        </div>

        <div className="bg-[#131b2e] rounded-xl border border-[#464554]/10 p-6 flex items-start gap-4">
          <span className="text-2xl">⏱️</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#908fa0] mb-1">Response Time</p>
            <p className="text-[#dae2fd] font-medium">1–2 business days</p>
            <p className="text-sm text-[#c7c4d7] mt-1">We aim to respond to all queries within 48 hours on business days.</p>
          </div>
        </div>

        <div className="bg-[#131b2e] rounded-xl border border-[#464554]/10 p-6 flex items-start gap-4">
          <span className="text-2xl">💳</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#908fa0] mb-1">Payment Issues</p>
            <p className="text-[#dae2fd] font-medium">Include your Razorpay Payment ID</p>
            <p className="text-sm text-[#c7c4d7] mt-1">For faster resolution of billing issues, include the payment ID from your Razorpay receipt email.</p>
          </div>
        </div>

        <div className="bg-[#131b2e] rounded-xl border border-[#464554]/10 p-6 flex items-start gap-4">
          <span className="text-2xl">🏢</span>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#908fa0] mb-1">Business Details</p>
            <p className="text-[#dae2fd] font-medium">DevChallenge Pro</p>
            <p className="text-sm text-[#c7c4d7] mt-1">India</p>
          </div>
        </div>
      </div>
    </main>
  );
}
