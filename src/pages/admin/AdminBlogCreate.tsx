// @ts-nocheck
import { useState } from "react";

const border = "#E2E8DE";
const ink = "#2C2C2C";
const muted = "#7A7A7A";
const white = "#FFFFFF";
const bg = "#F7F6F3";
const sage = "#6B7F5E";
const sageLight = "#EEF3EB";
const rose = "#B5505A";

const TYPES = [
  { id: "intro", icon: "P", name: "Introduction" },
  { id: "heading", icon: "H", name: "Section Heading" },
  { id: "quote", icon: "Q", name: "Pull Quote" },
  { id: "takeaways", icon: "TK", name: "Key Takeaways" },
  { id: "stats", icon: "#", name: "Statistics" },
  { id: "imagetext", icon: "IT", name: "Image + Text" },
  { id: "cards3", icon: "C3", name: "3 Feature Cards" },
  { id: "imagecards", icon: "IC", name: "Image Cards" },
  { id: "darkbox", icon: "DB", name: "Dark Callout" },
  { id: "steps", icon: "1.", name: "Numbered Steps" },
  { id: "conclusion", icon: "CO", name: "Conclusion" },
];

const DEFAULTS = {
  intro: { p1: "Start writing your first paragraph here.", p2: "A second paragraph." },
  heading: { text: "New Section Heading" },
  quote: { text: "A powerful insight that deserves special attention.", by: "-- Source or Author" },
  takeaways: { heading: "Key Takeaways", items: [{ title: "Point", desc: "Description." }] },
  stats: { items: [{ val: "100+", lbl: "Metric label" }] },
  imagetext: { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Image", left: true, text: "Write your body copy here." },
  cards3: { items: [{ val: "20 t", lbl: "Metric one", color: "sage" }] },
  imagecards: { items: [{ img: "https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=600&q=70", heading: "Card One", text: "Description." }] },
  darkbox: { heading: "Important Notes:", bullets: [{ text: "First bullet point" }] },
  steps: { heading: "Step-by-Step Guide", items: [{ title: "Step One", text: "What to do." }] },
  conclusion: { heading: "Conclusion", text: "Wrap up your article with key insights." },
};

const uid = () => Math.random().toString(36).slice(2, 9);
const clone = (v) => JSON.parse(JSON.stringify(v));

const baseMeta = {
  title: "New Blog Post",
  category: "Fashion Tips",
  excerpt: "A short description of your blog post...",
  cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80",
  author: "Babita Dahal",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  readTime: "5 min read",
};

function AddModal({ onClose, onAdd }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ width: 520, maxHeight: "80vh", overflow: "auto", background: white, borderRadius: 12, padding: 14 }} onClick={(e) => e.stopPropagation()}>
        <p style={{ margin: 0, fontFamily: "Georgia,serif", fontSize: 20, color: ink }}>Add a Section</p>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {TYPES.map((t) => (
            <button key={t.id} onClick={() => onAdd(t.id)} style={{ textAlign: "left", border: `1px solid ${border}`, background: bg, borderRadius: 9, padding: "10px 12px", cursor: "pointer" }}>
              <p style={{ margin: 0, color: ink, fontWeight: 700, fontSize: 12 }}>{t.name}</p>
              <p style={{ margin: "2px 0 0", color: muted, fontSize: 11 }}>{t.id}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Preview({ section }) {
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, background: white, padding: 12 }}>
      <p style={{ margin: 0, fontSize: 11, color: muted, textTransform: "uppercase" }}>{section.type}</p>
      <pre style={{ margin: "6px 0 0", whiteSpace: "pre-wrap", fontFamily: "Consolas, monospace", fontSize: 12, color: ink }}>
        {JSON.stringify(section.data, null, 2)}
      </pre>
    </div>
  );
}

export default function AdminBlogCreate() {
  const [view, setView] = useState("dashboard");
  const [blogs, setBlogs] = useState([{ id: "demo", status: "published", meta: { ...baseMeta }, sections: TYPES.map((t) => ({ id: uid(), type: t.id, data: clone(DEFAULTS[t.id]) })) }]);
  const [current, setCurrent] = useState(null);
  const [openIdx, setOpenIdx] = useState(null);
  const [insertAt, setInsertAt] = useState(null);

  const persist = (blog) => {
    setCurrent(blog);
    setBlogs((prev) => prev.map((b) => (b.id === blog.id ? blog : b)));
  };

  const createBlog = () => {
    const blog = {
      id: uid(),
      status: "draft",
      meta: { ...baseMeta, date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
      // Core fix: show ALL section features immediately.
      sections: TYPES.map((t) => ({ id: uid(), type: t.id, data: clone(DEFAULTS[t.id]) })),
    };
    setBlogs((prev) => [...prev, blog]);
    setCurrent(blog);
    setOpenIdx(0);
    setView("editor");
  };

  if (view === "dashboard") {
    return (
      <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Trebuchet MS','Lucida Grande',sans-serif" }}>
        <div style={{ height: 54, background: ink, color: white, display: "flex", alignItems: "center", padding: "0 24px", gap: 10 }}>
          <span style={{ fontFamily: "Georgia,serif", color: "#C9A84C", fontSize: 18 }}>✦ Styliste</span>
          <span style={{ color: "rgba(255,255,255,.3)" }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Blog Manager</span>
          <div style={{ flex: 1 }} />
          <button onClick={createBlog} style={{ border: "none", borderRadius: 8, background: sage, color: white, padding: "8px 14px", cursor: "pointer", fontWeight: 700 }}>+ New Blog</button>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "22px 14px", display: "grid", gap: 10 }}>
          {blogs.map((b) => (
            <div key={b.id} style={{ background: white, border: `1px solid ${border}`, borderRadius: 10, padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <img src={b.meta.cover} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: sage, background: sageLight, display: "inline-block", padding: "3px 8px", borderRadius: 20 }}>{b.meta.category}</p>
                <p style={{ margin: "6px 0 0", color: ink, fontFamily: "Georgia,serif", fontSize: 17 }}>{b.meta.title}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: muted }}>{b.meta.author} · {b.meta.date} · {b.meta.readTime}</p>
              </div>
              <button onClick={() => { setCurrent(clone(b)); setView("editor"); }} style={{ border: `1px solid ${sage}33`, background: sageLight, color: sage, borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>Edit</button>
              <button onClick={() => { setCurrent(clone(b)); setView("preview"); }} style={{ border: `1px solid ${border}`, background: bg, color: ink, borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>Preview</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!current) return null;

  if (view === "preview") {
    return (
      <div style={{ minHeight: "100vh", background: white, fontFamily: "'Trebuchet MS','Lucida Grande',sans-serif" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 50, padding: "8px 14px", background: "#FFFCE8", borderBottom: "2px solid #F0C030", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 700, background: "#FDE68A", borderRadius: 20, padding: "3px 8px" }}>⚠ Preview</span>
          <div style={{ flex: 1, color: "#777", fontSize: 12 }}>This is exactly how visitors will see this blog post</div>
          <button onClick={() => setView("editor")} style={{ border: "none", background: ink, color: white, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>← Back</button>
        </div>
        <div style={{ padding: 20 }}>
          <h1 style={{ fontFamily: "Georgia,serif", fontWeight: 400, color: ink }}>{current.meta.title}</h1>
          <p style={{ color: muted }}>{current.meta.author} · {current.meta.date} · {current.meta.readTime}</p>
          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
            {current.sections.map((s) => <Preview key={s.id} section={s} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EAEDE7", fontFamily: "'Trebuchet MS','Lucida Grande',sans-serif" }}>
      <div style={{ height: 50, background: ink, color: white, display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
        <button onClick={() => setView("dashboard")} style={{ border: "none", background: "none", color: "rgba(255,255,255,.65)", cursor: "pointer" }}>← Back</button>
        <span style={{ color: "rgba(255,255,255,.3)" }}>|</span>
        <span style={{ flex: 1, color: "#C9A84C", fontFamily: "Georgia,serif", fontSize: 14 }}>{current.meta.title}</span>
        <button onClick={() => setView("preview")} style={{ border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.09)", color: white, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Preview</button>
        <button onClick={() => persist({ ...current, status: "draft" })} style={{ border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.09)", color: white, borderRadius: 7, padding: "6px 10px", cursor: "pointer" }}>Save</button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 14px 40px" }}>
        <div style={{ background: white, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.08)" }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${border}` }}>
            <input value={current.meta.title} onChange={(e) => persist({ ...current, meta: { ...current.meta, title: e.target.value } })} style={{ width: "100%", border: `1px solid ${border}`, borderRadius: 8, padding: 10, fontSize: 16, fontFamily: "Georgia,serif", outline: "none", boxSizing: "border-box" }} />
            <p style={{ margin: "8px 0 0", fontSize: 11, color: muted }}>
              All section features are loaded: {current.sections.length} sections
            </p>
          </div>

          <div style={{ padding: 16 }}>
            {current.sections.map((section, i) => (
              <div key={section.id} style={{ marginBottom: 8 }}>
                <div onClick={() => setOpenIdx((p) => (p === i ? null : i))} style={{ border: `2px solid ${openIdx === i ? sage : border}`, borderRadius: openIdx === i ? "10px 10px 0 0" : 10, background: openIdx === i ? sage : white, color: openIdx === i ? white : ink, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: openIdx === i ? "rgba(255,255,255,.2)" : sageLight, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{TYPES.find((t) => t.id === section.type)?.icon || "?"}</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{TYPES.find((t) => t.id === section.type)?.name || section.type}</span>
                  <span style={{ fontSize: 11, opacity: 0.6 }}>#{i + 1}</span>
                  <div style={{ flex: 1 }} />
                  {openIdx === i && <button onClick={(e) => { e.stopPropagation(); setInsertAt(i); }} style={{ border: "none", borderRadius: 6, background: white, color: sage, width: 26, height: 26, cursor: "pointer" }}>+</button>}
                </div>
                {openIdx === i && (
                  <div style={{ border: `2px solid ${sage}`, borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                    <div style={{ padding: 12, background: white, borderBottom: `1px dashed ${border}` }}>
                      <Preview section={section} />
                    </div>
                    <div style={{ padding: 12, background: "#F0F4ED" }}>
                      <textarea
                        value={JSON.stringify(section.data, null, 2)}
                        onChange={(e) => {
                          try {
                            const data = JSON.parse(e.target.value);
                            const next = current.sections.map((s, idx) => (idx === i ? { ...s, data } : s));
                            persist({ ...current, sections: next });
                          } catch (_err) {}
                        }}
                        style={{ width: "100%", minHeight: 160, resize: "vertical", border: `1px solid ${border}`, borderRadius: 8, padding: 10, fontFamily: "Consolas, monospace", fontSize: 12, outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button onClick={() => setInsertAt(current.sections.length - 1)} style={{ border: `2px dashed #C8D8C2`, borderRadius: 10, background: "none", color: sage, padding: "9px 20px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>+ Add Section</button>
            </div>
          </div>
        </div>
      </div>

      {insertAt !== null && (
        <AddModal
          onClose={() => setInsertAt(null)}
          onAdd={(type) => {
            const next = [...current.sections];
            next.splice(insertAt + 1, 0, { id: uid(), type, data: clone(DEFAULTS[type]) });
            persist({ ...current, sections: next });
            setInsertAt(null);
          }}
        />
      )}
    </div>
  );
}
