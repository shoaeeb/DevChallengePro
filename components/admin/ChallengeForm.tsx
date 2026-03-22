"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

interface UserStory { label: string; text: string; color: string; }
interface Requirement { title: string; desc: string; }

interface ChallengeData {
  _id?: string;
  slug?: string;
  title?: string;
  difficulty?: string;
  tags?: string[];
  brief?: string;
  userStories?: UserStory[];
  requirements?: Requirement[];
  desktopImageUrl?: string;
  mobileImageUrl?: string;
  figmaUrl?: string;
  isPremium?: boolean;
  published?: boolean;
}

const COLORS = [
  "border-[#c0c1ff] text-[#c0c1ff]",
  "border-[#4cd7f6] text-[#4cd7f6]",
  "border-[#ffafd3] text-[#ffafd3]",
  "border-[#a8f0c6] text-[#a8f0c6]",
];

export default function ChallengeForm({ initial }: { initial?: ChallengeData }) {
  const router = useRouter();
  const isEdit = !!initial?._id;

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [difficulty, setDifficulty] = useState(initial?.difficulty ?? "Medium");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [brief, setBrief] = useState(initial?.brief ?? "");
  const [figmaUrl, setFigmaUrl] = useState(initial?.figmaUrl ?? "");
  const [desktopImageUrl, setDesktopImageUrl] = useState(initial?.desktopImageUrl ?? "");
  const [mobileImageUrl, setMobileImageUrl] = useState(initial?.mobileImageUrl ?? "");
  const [isPremium, setIsPremium] = useState(initial?.isPremium ?? false);
  const [published, setPublished] = useState(initial?.published ?? true);
  const [userStories, setUserStories] = useState<UserStory[]>(
    initial?.userStories ?? [{ label: "", text: "", color: COLORS[0] }]
  );
  const [requirements, setRequirements] = useState<Requirement[]>(
    initial?.requirements ?? [{ title: "", desc: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function autoSlug(val: string) {
    setTitle(val);
    if (!isEdit) setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  }

  function addStory() {
    setUserStories((p) => [...p, { label: "", text: "", color: COLORS[p.length % COLORS.length] }]);
  }
  function removeStory(i: number) {
    setUserStories((p) => p.filter((_, idx) => idx !== i));
  }
  function updateStory(i: number, field: keyof UserStory, val: string) {
    setUserStories((p) => p.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  }

  function addReq() {
    setRequirements((p) => [...p, { title: "", desc: "" }]);
  }
  function removeReq(i: number) {
    setRequirements((p) => p.filter((_, idx) => idx !== i));
  }
  function updateReq(i: number, field: keyof Requirement, val: string) {
    setRequirements((p) => p.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      slug, title, difficulty,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      brief, figmaUrl, desktopImageUrl, mobileImageUrl,
      isPremium, published, userStories, requirements,
    };

    const url = isEdit ? `/api/admin/challenges/${initial!._id}` : "/api/admin/challenges";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      setSaving(false);
      return;
    }
    router.push("/admin/challenges");
    router.refresh();
  }

  const inputCls = "w-full bg-[#0b1326] border border-[#464554]/30 rounded-lg px-4 py-3 text-sm text-[#dae2fd] placeholder:text-[#464554] focus:outline-none focus:border-[#c0c1ff]/50 transition-colors";
  const labelCls = "block text-[10px] uppercase tracking-widest text-[#908fa0] mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>Title</label>
          <input className={inputCls} value={title} onChange={(e) => autoSlug(e.target.value)} placeholder="E-commerce Platform" required />
        </div>
        <div>
          <label className={labelCls}>Slug</label>
          <input className={inputCls} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ecommerce-platform" required />
        </div>
        <div>
          <label className={labelCls}>Difficulty</label>
          <select className={inputCls} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className={labelCls}>Tags (comma separated)</label>
          <input className={inputCls} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Node.js, Stripe" />
        </div>
      </div>

      {/* Brief */}
      <div>
        <label className={labelCls}>Brief</label>
        <textarea className={`${inputCls} h-32 resize-none`} value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Describe the challenge..." required />
      </div>

      {/* Images via Cloudinary */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelCls}>Desktop Image</label>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
              const info = result.info as { secure_url: string };
              setDesktopImageUrl(info.secure_url);
            }}
          >
            {({ open }) => (
              <div>
                <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-[#464554]/30 rounded-lg p-4 text-xs text-[#908fa0] hover:border-[#c0c1ff]/40 hover:text-[#c0c1ff] transition-colors text-center">
                  {desktopImageUrl ? "Replace Desktop Image" : "Upload Desktop Image"}
                </button>
                {desktopImageUrl && (
                  <img src={desktopImageUrl} alt="Desktop preview" className="mt-2 rounded-lg w-full h-24 object-cover" />
                )}
              </div>
            )}
          </CldUploadWidget>
        </div>
        <div>
          <label className={labelCls}>Mobile Image</label>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
              const info = result.info as { secure_url: string };
              setMobileImageUrl(info.secure_url);
            }}
          >
            {({ open }) => (
              <div>
                <button type="button" onClick={() => open()} className="w-full border-2 border-dashed border-[#464554]/30 rounded-lg p-4 text-xs text-[#908fa0] hover:border-[#c0c1ff]/40 hover:text-[#c0c1ff] transition-colors text-center">
                  {mobileImageUrl ? "Replace Mobile Image" : "Upload Mobile Image"}
                </button>
                {mobileImageUrl && (
                  <img src={mobileImageUrl} alt="Mobile preview" className="mt-2 rounded-lg w-full h-24 object-cover" />
                )}
              </div>
            )}
          </CldUploadWidget>
        </div>
      </div>

      {/* Figma URL */}
      <div>
        <label className={labelCls}>Figma URL</label>
        <input className={inputCls} value={figmaUrl} onChange={(e) => setFigmaUrl(e.target.value)} placeholder="https://figma.com/file/..." />
      </div>

      {/* User Stories */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelCls}>User Stories</label>
          <button type="button" onClick={addStory} className="text-[10px] text-[#4cd7f6] hover:underline uppercase tracking-wider">+ Add</button>
        </div>
        <div className="space-y-3">
          {userStories.map((s, i) => (
            <div key={i} className="bg-[#131b2e] rounded-lg p-4 space-y-2 border border-[#464554]/10">
              <div className="flex gap-2">
                <input className={`${inputCls} flex-1`} value={s.label} onChange={(e) => updateStory(i, "label", e.target.value)} placeholder="User Story: Product Discovery" />
                <select className={`${inputCls} w-40`} value={s.color} onChange={(e) => updateStory(i, "color", e.target.value)}>
                  {COLORS.map((c) => <option key={c} value={c}>{c.split(" ")[1]}</option>)}
                </select>
                <button type="button" onClick={() => removeStory(i)} className="text-[#ffb4ab] text-xs px-2 hover:opacity-70">✕</button>
              </div>
              <textarea className={`${inputCls} h-20 resize-none`} value={s.text} onChange={(e) => updateStory(i, "text", e.target.value)} placeholder="As a user, I want to..." />
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className={labelCls}>Technical Requirements</label>
          <button type="button" onClick={addReq} className="text-[10px] text-[#4cd7f6] hover:underline uppercase tracking-wider">+ Add</button>
        </div>
        <div className="space-y-3">
          {requirements.map((r, i) => (
            <div key={i} className="bg-[#131b2e] rounded-lg p-4 space-y-2 border border-[#464554]/10">
              <div className="flex gap-2">
                <input className={`${inputCls} flex-1`} value={r.title} onChange={(e) => updateReq(i, "title", e.target.value)} placeholder="Server-Side Rendering" />
                <button type="button" onClick={() => removeReq(i)} className="text-[#ffb4ab] text-xs px-2 hover:opacity-70">✕</button>
              </div>
              <input className={inputCls} value={r.desc} onChange={(e) => updateReq(i, "desc", e.target.value)} placeholder="Description..." />
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} className="w-4 h-4 accent-[#c0c1ff]" />
          <span className="text-sm text-[#dae2fd]">💎 Premium (Pro only)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#4cd7f6]" />
          <span className="text-sm text-[#dae2fd]">Published</span>
        </label>
      </div>

      {error && <p className="text-[#ffb4ab] text-sm bg-[#93000a]/20 border border-[#93000a]/30 rounded-lg px-4 py-3">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-br from-[#c0c1ff] to-[#8083ff] text-[#1000a9] px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Challenge"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-lg border border-[#464554]/30 text-sm text-[#c7c4d7] hover:bg-[#171f33] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
