import Link from "next/link";

export const metadata = { title: "Privacy Policy – DevChallenge Pro" };

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-[10px] uppercase tracking-widest text-[#908fa0] mb-4">Last updated: March 2026</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-[#dae2fd] mb-10">Privacy Policy</h1>

      <div className="space-y-10 text-[#c7c4d7] leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">1. Who We Are</h2>
          <p>DevChallenge Pro ("we", "us", "our") is an online platform that provides full-stack coding challenges and a community submission gallery. Our website is <span className="text-[#4cd7f6]">devchallengepro.com</span>. For any privacy-related queries, contact us at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="text-[#dae2fd]">GitHub OAuth data:</span> When you sign in with GitHub, we receive your GitHub username, public email address, and profile avatar. We do not receive your GitHub password.</li>
            <li><span className="text-[#dae2fd]">Submission data:</span> Repository URLs, live demo URLs, and tech stack selections you provide when submitting a solution.</li>
            <li><span className="text-[#dae2fd]">Payment data:</span> Payments are processed by Razorpay. We do not store your card details. We receive a payment confirmation and your email address from Razorpay.</li>
            <li><span className="text-[#dae2fd]">Usage data:</span> Standard server logs including IP address, browser type, and pages visited, retained for up to 30 days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To authenticate you via GitHub OAuth and maintain your session.</li>
            <li>To display your public GitHub profile on submitted solutions.</li>
            <li>To process and verify Pro subscription payments via Razorpay.</li>
            <li>To manage your Pro membership status and expiry.</li>
            <li>To send transactional emails related to your account or subscription (no marketing without consent).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">4. Data Sharing</h2>
          <p>We do not sell your personal data. We share data only with:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><span className="text-[#dae2fd]">GitHub</span> – for OAuth authentication.</li>
            <li><span className="text-[#dae2fd]">Razorpay</span> – for payment processing. Subject to <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#4cd7f6] hover:underline">Razorpay's Privacy Policy</a>.</li>
            <li><span className="text-[#dae2fd]">MongoDB Atlas</span> – for database hosting. Data is stored in encrypted form.</li>
            <li><span className="text-[#dae2fd]">Cloudinary</span> – for image hosting of challenge assets.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">5. Cookies</h2>
          <p>We use a single session cookie issued by NextAuth.js to keep you signed in. We do not use advertising or tracking cookies.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">6. Data Retention</h2>
          <p>Your account data is retained as long as your account is active. You may request deletion at any time by emailing <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a>. Submission data (GitHub links) that is publicly visible may remain visible to other users after account deletion.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">7. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:osman.shoaeeb@gmail.com" className="text-[#4cd7f6] hover:underline">osman.shoaeeb@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#dae2fd] mb-3">8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-[#464554]/15 flex gap-6 text-xs text-[#464554]">
        <Link href="/terms" className="hover:text-[#c0c1ff] transition-colors">Terms of Service</Link>
        <Link href="/refunds" className="hover:text-[#c0c1ff] transition-colors">Refund Policy</Link>
        <Link href="/contact" className="hover:text-[#c0c1ff] transition-colors">Contact Us</Link>
      </div>
    </main>
  );
}
