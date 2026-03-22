"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

const PRO_FEATURES = [
  { icon: "🔓", title: "Premium Challenges", desc: "Access all premium challenges — harder, more complex, and closer to real production requirements." },
  { icon: "⚡", title: "Starter Code", desc: "Get boilerplate repos with auth, DB, and routing pre-wired so you can focus on the hard parts." },
  { icon: "🎥", title: "Video Walkthroughs", desc: "Watch senior engineers solve each challenge from scratch. Learn the thought process, not just the code." },
  { icon: "🏆", title: "Pro Leaderboard", desc: "Compete on the Pro leaderboard and get your solutions featured to thousands of developers." },
  { icon: "💬", title: "Code Reviews", desc: "Submit your solution for a detailed review from our engineering team." },
  { icon: "🚀", title: "Early Access", desc: "Get new challenges before they go public. Stay ahead of the curve." },
];

const FREE_FEATURES = [
  { label: "Submit solutions", included: true },
  { label: "Figma design files", included: true },
  { label: "Free challenges", included: true },
  { label: "Solutions gallery", included: true },
  { label: "Premium challenges", included: false },
  { label: "Starter code repos", included: false },
  { label: "Video walkthroughs", included: false },
  { label: "Code reviews", included: false },
];

const PRO_FEATURES_LIST = [
  { label: "Everything in Free", included: true },
  { label: "Premium challenges", included: true },
  { label: "Starter code repos", included: true },
  { label: "Video walkthroughs", included: true },
  { label: "Code reviews", included: true },
  { label: "Pro leaderboard", included: true },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function ProPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (!session) return signIn("github");
    setLoading(true);

    try {
      // Load Razorpay script dynamically
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay"));
          document.body.appendChild(script);
        });
      }

      // Create order on server
      const res = await fetch("/api/payments/create-order", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create order");
      const { orderId, amount, currency, keyId } = await res.json();

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevChallenge Pro",
        description: "Monthly Pro Subscription",
        order_id: orderId,
        prefill: {
          name: session.user?.name ?? "",
          email: session.user?.email ?? "",
        },
        theme: { color: "#c0c1ff" },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          // Verify payment on server
          const verify = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verify.ok) {
            window.location.href = "/pro/success";
          } else {
            alert("Payment verification failed. Contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden border-b border-[#464554]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#c0c1ff15_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-[#c0c1ff]/10 border border-[#c0c1ff]/20 text-[#c0c1ff] text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
            Pro Membership
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#dae2fd] mb-6 leading-[0.95]">
            Go from good to{" "}
            <span className="bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6] bg-clip-text text-transparent">
              production-ready.
            </span>
          </h1>
          <p className="text-[#c7c4d7] text-lg max-w-2xl mx-auto mb-4">
            Unlock Figma files, starter code, video walkthroughs, and code reviews. Everything you need to build like a senior engineer.
          </p>
          <p className="text-[#908fa0] text-sm">
            Supports UPI, cards, net banking, and international payments via Razorpay.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-[#131b2e] rounded-2xl border border-[#464554]/20 p-8 flex flex-col">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#908fa0] mb-2">Free</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-extrabold text-[#dae2fd]">₹0</span>
                <span className="text-[#908fa0] mb-2">/ forever</span>
              </div>
            </div>
            <ul className="space-y-3 flex-grow mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <span className={f.included ? "text-[#4cd7f6]" : "text-[#464554]"}>
                    {f.included ? "✓" : "✕"}
                  </span>
                  <span className={f.included ? "text-[#dae2fd]" : "text-[#464554]"}>{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              disabled
              className="w-full py-3 rounded-lg border border-[#464554]/30 text-[#464554] text-sm font-bold uppercase tracking-wider cursor-default"
            >
              Current Plan
            </button>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-b from-[#1a1f35] to-[#131b2e] rounded-2xl border border-[#c0c1ff]/30 p-8 flex flex-col shadow-[0_0_60px_-10px_rgba(192,193,255,0.15)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#c0c1ff] to-[#8083ff] text-[#1000a9] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#c0c1ff] mb-2">Pro</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-extrabold text-[#dae2fd]">₹800</span>
                <span className="text-[#908fa0] mb-2">/ month</span>
              </div>
              <p className="text-[10px] text-[#908fa0] mt-1">~$9.50 USD · billed monthly · cancel anytime</p>
            </div>
            <ul className="space-y-3 flex-grow mb-8">
              {PRO_FEATURES_LIST.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <span className="text-[#c0c1ff]">✓</span>
                  <span className="text-[#dae2fd]">{f.label}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 rounded-lg bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] font-bold uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : session ? "Subscribe Now →" : "Sign in to Subscribe →"}
            </button>
            <p className="text-center text-[10px] text-[#908fa0] mt-3">
              Secured by Razorpay · UPI · Cards · Net Banking · International
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 bg-[#131b2e] border-t border-[#464554]/10">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Everything in Pro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRO_FEATURES.map((f) => (
              <div key={f.title} className="bg-[#171f33] rounded-xl p-6 border border-[#464554]/10 hover:border-[#c0c1ff]/20 transition-colors">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-[#dae2fd] mb-2">{f.title}</h3>
                <p className="text-sm text-[#c7c4d7] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-[#464554]/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Can I cancel anytime?", a: "Yes. Cancel before your next billing date and you won't be charged again. You keep Pro access until the end of the period." },
              { q: "Do you support international payments?", a: "Yes. Razorpay supports Visa, Mastercard, and Amex cards from most countries, plus PayPal and other international methods." },
              { q: "What currency will I be charged in?", a: "Indian users are charged in INR (₹800/mo). International cards are charged in INR and your bank handles the conversion." },
            ].map((item) => (
              <div key={item.q} className="border-b border-[#464554]/15 pb-6">
                <p className="font-bold text-[#dae2fd] mb-2">{item.q}</p>
                <p className="text-sm text-[#c7c4d7] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
