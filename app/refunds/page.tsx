import Link from "next/link";

export const metadata = { title: "Refund & Cancellation Policy – DevChallenge Pro" };

export default function RefundsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-[10px] uppercase tracking-widest text-[#908fa0] mb-4">Last updated: March 2026</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-10">Refund & Cancellation Policy</h1>

      <div className="space-y-10 text-[#c7c4d7] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Subscription Model</h2>
          <p>DevChallenge Pro offers a monthly Pro subscription at ₹800/month. Subscriptions are manually renewed — there is no automatic recurring charge. Your Pro access is valid for 30 days from the date of each payment.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Cancellation</h2>
          <p>Since subscriptions do not auto-renew, there is nothing to "cancel". Simply do not renew at the end of your 30-day period and your account will revert to the free tier automatically. No action is required on your part.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Refund Eligibility</h2>
          <p>We offer a full refund within <span className="text-[#dae2fd] font-semibold">7 days of payment</span> if:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>You have not downloaded any Figma files or starter code repositories.</li>
            <li>You have not accessed any Pro-only video walkthroughs.</li>
            <li>You contact us within 7 days of the payment date.</li>
          </ul>
          <p className="mt-4">Refunds will not be issued after 7 days or if Pro content has been accessed.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">How to Request a Refund</h2>
          <p>Email us at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a> with:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Your registered GitHub username.</li>
            <li>The Razorpay payment ID (found in your email receipt).</li>
            <li>Reason for the refund request.</li>
          </ul>
          <p className="mt-4">Approved refunds are processed within 5–7 business days to the original payment method.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Delivery of Digital Goods</h2>
          <p>DevChallenge Pro is a digital platform. Upon successful payment, Pro access is activated instantly on your account — there is no physical shipment. Access to Pro features (premium challenges, starter code, video walkthroughs) is available immediately after payment confirmation.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Failed or Duplicate Payments</h2>
          <p>If you were charged but did not receive Pro access, or were charged more than once, contact us immediately at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a> with your Razorpay payment ID. We will resolve it within 2 business days.</p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-[#464554]/15 flex gap-6 text-xs text-[#464554]">
        <Link href="/privacy" className="hover:text-[#c0c1ff] transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-[#c0c1ff] transition-colors">Terms of Service</Link>
        <Link href="/contact" className="hover:text-[#c0c1ff] transition-colors">Contact Us</Link>
      </div>
    </main>
  );
}
