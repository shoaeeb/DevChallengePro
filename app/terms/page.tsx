import Link from "next/link";

export const metadata = { title: "Terms of Service – DevChallenge Pro" };

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-[10px] uppercase tracking-widest text-[#908fa0] mb-4">Last updated: March 2026</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-10">Terms of Service</h1>

      <div className="space-y-10 text-[#c7c4d7] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using DevChallenge Pro ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">2. Description of Service</h2>
          <p>DevChallenge Pro provides coding challenges, design assets, and a community submission gallery for developers. A free tier and a paid Pro subscription (₹800/month) are available. Pro features include access to premium challenges, starter code repositories, and video walkthroughs.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">3. Account Registration</h2>
          <p>You must sign in with a valid GitHub account to submit solutions or purchase a Pro subscription. You are responsible for maintaining the security of your GitHub account. We are not liable for any loss resulting from unauthorized access to your account.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">4. Pro Subscription</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>The Pro subscription is billed at ₹800 per month.</li>
            <li>Payment is processed securely by Razorpay. We do not store payment card details.</li>
            <li>Your Pro access is valid for 30 days from the date of payment.</li>
            <li>Subscriptions do not auto-renew. You must manually renew each month.</li>
            <li>Prices are subject to change with 30 days' notice.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">5. Intellectual Property</h2>
          <p>All challenge briefs, design assets, Figma files, starter code, and video content on the Platform are owned by DevChallenge Pro. You may use these assets solely for the purpose of completing challenges on the Platform. Redistribution, resale, or republication of any Platform content is prohibited.</p>
          <p className="mt-2">Code you write and submit remains your own. By submitting, you grant DevChallenge Pro a non-exclusive licence to display your submission (GitHub link, username, tech stack) publicly on the Platform.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Submit malicious, offensive, or plagiarised content.</li>
            <li>Attempt to reverse-engineer, scrape, or copy Platform content at scale.</li>
            <li>Share Pro credentials or assets with non-subscribers.</li>
            <li>Use the Platform for any unlawful purpose.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">7. Disclaimer of Warranties</h2>
          <p>The Platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability or that challenge content will be error-free.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, DevChallenge Pro shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you paid in the 30 days preceding the claim.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">9. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">10. Contact</h2>
          <p>For any questions regarding these Terms, contact us at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a>.</p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-[#464554]/15 flex gap-6 text-xs text-[#464554]">
        <Link href="/privacy" className="hover:text-[#c0c1ff] transition-colors">Privacy Policy</Link>
        <Link href="/refunds" className="hover:text-[#c0c1ff] transition-colors">Refund Policy</Link>
        <Link href="/contact" className="hover:text-[#c0c1ff] transition-colors">Contact Us</Link>
      </div>
    </main>
  );
}
