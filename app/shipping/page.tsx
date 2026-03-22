import Link from "next/link";

export const metadata = { title: "Shipping Policy – DevChallenge Pro" };

export default function ShippingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-[10px] uppercase tracking-widest text-[#908fa0] mb-4">Last updated: March 2026</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-10">Shipping Policy</h1>

      <div className="space-y-10 text-[#c7c4d7] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Digital Product — No Physical Shipping</h2>
          <p>DevChallenge Pro is an entirely digital platform. We do not sell or ship any physical goods. All products and services — including Pro subscriptions, challenge access, Figma files, starter code, and video walkthroughs — are delivered digitally.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Instant Digital Delivery</h2>
          <p>Upon successful payment, your Pro subscription is activated immediately on your account. You will have instant access to all Pro features without any waiting period. No download or installation is required — everything is accessible through your browser at <span className="text-[#4cd7f6]">devchallengepro.com</span>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">Access Issues After Payment</h2>
          <p>If your Pro access is not activated within 10 minutes of a successful payment, please contact us at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a> with your Razorpay payment ID and we will resolve it promptly.</p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-[#464554]/15 flex gap-6 text-xs text-[#464554]">
        <Link href="/privacy" className="hover:text-[#c0c1ff] transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-[#c0c1ff] transition-colors">Terms of Service</Link>
        <Link href="/refunds" className="hover:text-[#c0c1ff] transition-colors">Refund Policy</Link>
        <Link href="/contact" className="hover:text-[#c0c1ff] transition-colors">Contact Us</Link>
      </div>
    </main>
  );
}
