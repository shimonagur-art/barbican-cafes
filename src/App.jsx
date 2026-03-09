import { useState, useMemo } from "react";

const WORK_LAT = 51.5202;
const WORK_LNG = -0.0963;

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function walkMins(lat, lng) {
  return Math.round((distanceKm(WORK_LAT, WORK_LNG, lat, lng) / 5) * 60);
}

const RAW_CAFES = [
  {
    name: "Catch Up Cafe",
    address: "Barbican Estate, EC1A 4JQ",
    lat: 51.5216, lng: -0.0975,
    rating: 4.9, ratingCount: 86,
    hours: "Mon–Sun 8:00 AM – 5:00 PM",
    types: ["Cosy", "Halal", "Local gem"],
    highlight: "Tiny neighbourhood gem with incredible hospitality",
    reviews: [
      { text: "One of the best café experiences I've had in a long time. The staff are incredibly welcoming and the place has a very homely feel.", author: "Google reviewer" },
      { text: "Love this little local coffee shop. Very decent prices vs big brands, better coffee and food.", author: "Regular" },
    ],
    place_id: "ChIJ53FOIZ4bdkgRVBnX9fJNBMM",
  },
  {
    name: "NAR Cafe",
    address: "1 Goswell Rd, EC1M 7AH",
    lat: 51.5216, lng: -0.0975,
    rating: 5.0, ratingCount: 42,
    hours: "Mon–Fri 8:00 AM – 5:00 PM · Sat–Sun 8:00 AM – 4:00 PM",
    types: ["Specialty", "Halal", "Local gem"],
    highlight: "5-star rated — Azerbaijani teas & incredible food",
    reviews: [
      { text: "Great coffee, lovely atmosphere, and genuinely nice people running the place.", author: "Regular" },
      { text: "Really amazing food! Felt like coming to a family member's house.", author: "Google reviewer" },
    ],
    place_id: "ChIJhWQ8VQAbdkgR5ec3hf4BazY",
  },
  {
    name: "The Black Olive Cafe",
    address: "5 Charterhouse Bldgs, EC1M 7AN",
    lat: 51.5229, lng: -0.0982,
    rating: 4.8, ratingCount: 377,
    hours: "Mon–Sat 7:00 AM – 5:00 PM · Sun 8:00 AM – 5:00 PM",
    types: ["Turkish", "Brunch", "Halal"],
    highlight: "Turkish breakfasts & homemade pastries — a local treasure",
    reviews: [
      { text: "The Turkish breakfast was absolutely delicious, reminiscent of home. Portions were incredibly generous.", author: "Verified visitor" },
      { text: "Boy am I glad I found this place! Ordered avocado and egg on toast and was presented with a full meze.", author: "Google reviewer" },
    ],
    place_id: "ChIJ5w6I3OwbdkgR84JXLgEkDe4",
  },
  {
    name: "CAWFEE Barbican",
    address: "58 Long Ln, EC1A 9EJ",
    lat: 51.5192, lng: -0.0999,
    rating: 4.8, ratingCount: 194,
    hours: "Mon–Fri 7:00 AM – 5:00 PM · Sat–Sun 9:00 AM – 4:00 PM",
    types: ["Specialty", "Cosy", "Brunch"],
    highlight: "Best almond croissants + seriously great matcha",
    reviews: [
      { text: "One of the best cafés I've ever been to. The matcha latte is the best I've ever had.", author: "Regular" },
      { text: "Lovely coffee, lovely food, lovely people. A little like coming home after a long journey.", author: "Professor Marek Ziebart" },
    ],
    place_id: "ChIJ5yGJbrAbdkgRPVmiy6ptGmQ",
  },
  {
    name: "Barbican Cafe",
    address: "99-101 Lever St, EC1V 3RQ",
    lat: 51.5271, lng: -0.0959,
    rating: 4.9, ratingCount: 1299,
    hours: "Mon–Fri 6:30 AM – 4:00 PM · Sat 7:00 AM – 4:00 PM · Sun 7:30 AM – 4:00 PM",
    types: ["Brunch", "Value", "Early opener"],
    highlight: "Legendary breakfasts at unbeatable prices",
    reviews: [
      { text: "The breakfast was outstanding — every little detail was carefully thought out. The prices are unbeatable.", author: "Verified visitor" },
      { text: "They are artists with the coffee! Our new favourite spot in town.", author: "Google reviewer" },
    ],
    place_id: "ChIJtbaLRlgbdkgR4ymR-jN2dnQ",
  },
  {
    name: "Goswell Road Coffee",
    address: "160-164 Goswell Rd, EC1V 7DU",
    lat: 51.5258, lng: -0.0995,
    rating: 4.6, ratingCount: 881,
    hours: "Mon–Fri 7:00 AM – 6:00 PM · Sat–Sun 8:00 AM – 6:00 PM",
    types: ["Specialty", "Work-friendly", "Vegan-friendly"],
    highlight: "Legendary local with iconic music & mismatched furniture",
    reviews: [
      { text: "One of my favourite coffee shops in London. Friendly service, comfy mismatched furniture, lots of baked goods.", author: "Regular" },
      { text: "I've been coming here for around 5 years and the coffee still tastes amazing.", author: "Long-time regular" },
    ],
    place_id: "ChIJnVCT_lkbdkgRrO0ObezhGpY",
  },
  {
    name: "HALFCUP Barts Square",
    address: "22-23 Bartholomew Cl, EC1A 7BB",
    lat: 51.5181, lng: -0.0986,
    rating: 4.5, ratingCount: 358,
    hours: "Mon–Fri 8:00 AM – 4:00 PM · Sat–Sun 9:00 AM – 4:00 PM",
    types: ["Brunch", "Specialty"],
    highlight: "Exciting brunch menu in a stunning square",
    reviews: [
      { text: "The FOOD!! It's beautiful, lush and amazingly delicious.", author: "Google reviewer" },
      { text: "Excellent coffee. Hash browns done perfectly — highly recommend you book a table.", author: "Verified visitor" },
    ],
    place_id: "ChIJ74JfRKUbdkgR-l-Z07G_dbE",
  },
  {
    name: "Barbican Cinema Café & Bar",
    address: "Beech St, Barbican, EC1Y 4SB",
    lat: 51.5210, lng: -0.0931,
    rating: 4.2, ratingCount: 119,
    hours: "Mon–Sun 10:00 AM – 9:00 PM",
    types: ["Late", "Work-friendly", "Bar"],
    highlight: "Late-night option inside the iconic Barbican Centre",
    reviews: [
      { text: "A fantastic place to chill for a few hours on your laptop.", author: "Google reviewer" },
      { text: "Noisy, busy but enjoy coffee & cake there. A lot of hot & cold food available.", author: "Verified visitor" },
    ],
    place_id: "ChIJIT1wttkddkgRw82qW06uQqA",
  },
  {
    name: "Early Bees Coffee Old Street",
    address: "40 City Rd, EC1Y 2AN",
    lat: 51.5240, lng: -0.0878,
    rating: 5.0, ratingCount: 1193,
    hours: "Mon–Fri 7:00 AM – 7:00 PM · Sat–Sun 8:00 AM – 5:00 PM",
    types: ["Specialty", "Cosy", "Matcha"],
    highlight: "Perfect 5.0 rating — honey cloud matcha is unmissable",
    reviews: [
      { text: "Hands down one of the best matcha lattes in London. The honey concept makes everything different.", author: "Verified visitor" },
      { text: "The staff is super welcoming and friendly — you can tell they genuinely care about customers.", author: "Google reviewer" },
    ],
    place_id: "ChIJlb4SYAAddkgRpczE1ODVWlY",
  },
  {
    name: "Blooms & Beans",
    address: "104 Old St, EC1V 9AY",
    lat: 51.5247, lng: -0.0933,
    rating: 4.9, ratingCount: 81,
    hours: "Mon–Fri 7:00 AM – 5:00 PM · Sat 8:00 AM – 5:00 PM · Sun Closed",
    types: ["Specialty", "Cosy", "Unique"],
    highlight: "A florist and café in one — genuinely beautiful",
    reviews: [
      { text: "Getting your daily caffeine dose surrounded by gorgeous roses — I absolutely loved it.", author: "Google reviewer" },
      { text: "The Oat Latte was hot and not too strong — just perfect.", author: "Verified visitor" },
    ],
    place_id: "ChIJ6aj5soYddkgRdrbUMqXxmKo",
  },
  {
    name: "Owlie",
    address: "36 Old St, EC1V 9AE",
    lat: 51.5238, lng: -0.0966,
    rating: 4.9, ratingCount: 24,
    hours: "Mon–Sun 7:00 AM – 11:00 PM",
    types: ["Late", "Specialty", "Vegan-friendly"],
    highlight: "Open until 11pm every day — rare around here",
    reviews: [
      { text: "Coffee is rich, smooth, and clearly high quality. The atmosphere is warm and welcoming.", author: "Verified visitor" },
      { text: "They serve Kiss the Hippo coffee and bake their own croissants.", author: "Google reviewer" },
    ],
    place_id: "ChIJC7k8NQAbdkgRf1phX77JlQ4",
  },
  {
    name: "Party at Moorgate",
    address: "71 Moorgate, EC2R 6BH",
    lat: 51.5172, lng: -0.0890,
    rating: 4.8, ratingCount: 94,
    hours: "Mon–Thu 7:00 AM – 4:00 PM · Fri 7:00 AM – 1:30 PM · Sat–Sun Closed",
    types: ["Specialty", "Quick"],
    highlight: "Exceptional espresso — tiny, warm and intimate",
    reviews: [
      { text: "One of the best coffees I've had in London. Aromatic with really balanced bitterness and acidity.", author: "Coffee nerd" },
      { text: "Located just around the corner from my office. They consistently serve expertly crafted espresso.", author: "Local regular" },
    ],
    place_id: "ChIJfXSWmlgddkgRT1ANOae0byc",
  },
  {
    name: "Rosslyn Coffee London Wall",
    address: "118 London Wall, EC2Y 5JA",
    lat: 51.5177, lng: -0.0890,
    rating: 4.8, ratingCount: 384,
    hours: "Mon–Fri 6:30 AM – 5:00 PM · Sat–Sun Closed",
    types: ["Specialty", "Quick", "Early opener"],
    highlight: "Buzzing City favourite — exceptional flat whites",
    reviews: [
      { text: "One of the busiest coffee shops I've ever seen — yet they manage to give the best customer experience.", author: "Verified visitor" },
      { text: "My flat white was among the best I've had in London.", author: "Google reviewer" },
    ],
    place_id: "ChIJ1fRYjo4ddkgRRZq7lphil6E",
  },
  {
    name: "Black Sheep Coffee London Wall",
    address: "60 London Wall, EC2M 5TQ",
    lat: 51.5169, lng: -0.0870,
    rating: 4.7, ratingCount: 499,
    hours: "Mon–Thu 6:30 AM – 7:00 PM · Fri 7:00 AM – 6:00 PM · Sat 9:00 AM – 5:00 PM · Sun Closed",
    types: ["Work-friendly", "Specialty", "Early opener"],
    highlight: "Super fast WiFi, great for working — warm atmosphere",
    reviews: [
      { text: "So great to work in. Super fast wifi and no one rushed me, I felt so welcomed.", author: "Freelancer" },
      { text: "The whole team creates such a positive, calm vibe, even when it's busy.", author: "Google reviewer" },
    ],
    place_id: "ChIJ99KJE94ddkgRw0xd2qoTtzs",
  },
];

const cafes = RAW_CAFES.map((c) => ({ ...c, walkMins: walkMins(c.lat, c.lng) }));

const typeColors = {
  Specialty: "#c8a96e", Cosy: "#a8c5a0", Brunch: "#b8d4e8",
  Turkish: "#e8b890", Halal: "#c8e8d4", "Local gem": "#e8d4b8",
  "Work-friendly": "#c4b8e8", "Vegan-friendly": "#b8e8b8",
  Late: "#b8b8e8", Bar: "#d4b8e8", Value: "#d4e8b8",
  "Early opener": "#fde8c8", Quick: "#e8e0a8", Matcha: "#b8e8c8",
  Unique: "#e8c8d4",
};

function Stars({ rating }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "#e0d8cc"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("walk");
  const [filterType, setFilterType] = useState("All");
  const [maxWalk, setMaxWalk] = useState(10);
  const [search, setSearch] = useState("");

  const allTypes = useMemo(() => {
    const s = new Set();
    cafes.forEach((c) => c.types.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    let r = cafes.filter((c) =>
      (filterType === "All" || c.types.includes(filterType)) &&
      c.walkMins <= maxWalk &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.highlight.toLowerCase().includes(search.toLowerCase()))
    );
    r.sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating :
      sortBy === "walk" ? a.walkMins - b.walkMins :
      b.ratingCount - a.ratingCount
    );
    return r;
  }, [sortBy, filterType, maxWalk, search]);

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#f7f5f1", color: "#1e1a14" }}>
      <div style={{
        background: "#1a2a1a", padding: "28px 20px 24px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(100,160,80,0.18) 0%, transparent 55%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: "#7ab870", textTransform: "uppercase", marginBottom: 6 }}>☕ Your Café Guide</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 400, color: "#f0f4ee" }}>Cafés near the Barbican</h1>
          <p style={{ margin: "6px 0 0", color: "rgba(240,244,238,0.5)", fontSize: 13, fontStyle: "italic" }}>EC1 · within walking distance</p>
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: "1px solid #e8e2d8", padding: "14px 16px" }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cafés or vibes..."
          style={{
            width: "100%", boxSizing: "border-box", padding: "9px 14px",
            border: "1.5px solid #ddd8ce", borderRadius: 8, fontSize: 13,
            background: "#f7f5f1", color: "#1e1a14", outline: "none",
            fontFamily: "Georgia, serif", marginBottom: 12,
          }} />

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#7a6a4a", textTransform: "uppercase", marginBottom: 5 }}>Sort</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #ddd8ce", borderRadius: 6, background: "#f7f5f1", fontSize: 12, color: "#1e1a14", fontFamily: "Georgia, serif" }}>
              <option value="walk">🚶 Closest first</option>
              <option value="rating">⭐ Highest rated</option>
              <option value="reviews">💬 Most reviewed</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#7a6a4a", textTransform: "uppercase", marginBottom: 5 }}>Max walk: {maxWalk} min</div>
            <input type="range" min={3} max={10} value={maxWalk}
              onChange={(e) => setMaxWalk(Number(e.target.value))}
              style={{ width: "100%", marginTop: 6, accentColor: "#4a8a3a" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {allTypes.map((t) => (
            <button key={t} onClick={() => setFilterType(t)}
              style={{
                padding: "4px 11px", borderRadius: 20, fontSize: 11, cursor: "pointer",
                border: filterType === t ? "1.5px solid #4a8a3a" : "1.5px solid #ddd8ce",
                background: filterType === t ? "#4a8a3a" : "#f7f5f1",
                color: filterType === t ? "#fff" : "#4a3a20",
                fontFamily: "Georgia, serif", transition: "all 0.15s",
              }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "10px 16px 2px", fontSize: 12, color: "#8a7a5a", fontStyle: "italic" }}>
        {filtered.length} café{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div style={{ padding: "6px 12px 28px" }}>
        {filtered.map((cafe) => {
          const open = selected?.name === cafe.name;
          return (
            <div key={cafe.name} onClick={() => setSelected(open ? null : cafe)}
              style={{
                background: "#fff", borderRadius: 12, marginBottom: 10,
                border: open ? "2px solid #4a8a3a" : "1.5px solid #e4ddd0",
                cursor: "pointer", overflow: "hidden", transition: "all 0.2s",
                boxShadow: open ? "0 4px 18px rgba(74,138,58,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
              }}>
              <div style={{ padding: "14px 16px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{cafe.name}</h3>
                      <span style={{
                        fontSize: 11, padding: "2px 8px", borderRadius: 10,
                        background: cafe.walkMins <= 4 ? "#e8f5e4" : cafe.walkMins <= 7 ? "#fdf3e0" : "#f5f0e8",
                        color: cafe.walkMins <= 4 ? "#3a7a2a" : cafe.walkMins <= 7 ? "#b8820a" : "#7a6a4a",
                        fontWeight: 600,
                      }}>🚶 {cafe.walkMins} min</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#8a7a5a", marginBottom: 6 }}>{cafe.address}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Stars rating={cafe.rating} />
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{cafe.rating}</span>
                      <span style={{ fontSize: 11, color: "#bbb" }}>({cafe.ratingCount.toLocaleString()})</span>
                    </div>
                  </div>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: cafe.rating >= 4.9 ? "linear-gradient(135deg, #4a8a3a, #2a6a1a)" : "linear-gradient(135deg, #6a9a5a, #4a7a3a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0,
                  }}>{cafe.rating}</div>
                </div>

                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: "8px 0 6px" }}>
                  {cafe.types.map((t) => (
                    <span key={t} style={{
                      fontSize: 10, padding: "2px 7px", borderRadius: 10,
                      background: `${typeColors[t] || "#e8e0d4"}22`,
                      color: "#4a3a20", border: `1px solid ${typeColors[t] || "#e8e0d4"}66`,
                    }}>{t}</span>
                  ))}
                </div>

                <p style={{ margin: 0, fontSize: 12, color: "#5a4a2a", fontStyle: "italic" }}>"{cafe.highlight}"</p>
              </div>

              {open && (
                <div style={{ borderTop: "1px solid #f0e8dc", padding: "14px 16px", background: "#fdfaf6" }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#4a8a3a", marginBottom: 4 }}>Opening Hours</div>
                    <div style={{ fontSize: 12, color: "#5a4a2a" }}>{cafe.hours}</div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#4a8a3a", marginBottom: 8 }}>What people say</div>
                    {cafe.reviews.map((r, i) => (
                      <div key={i} style={{
                        background: "#fff", border: "1px solid #e8e0d4", borderRadius: 8,
                        padding: "9px 12px", marginBottom: 7,
                      }}>
                        <p style={{ margin: "0 0 4px", fontSize: 12, color: "#1e1a14", lineHeight: 1.5 }}>"{r.text}"</p>
                        <div style={{ fontSize: 10, color: "#aaa" }}>— {r.author}</div>
                      </div>
                    ))}
                  </div>
                  <a href={`https://www.google.com/maps/place/?q=place_id:${cafe.place_id}`}
                    target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-block", padding: "7px 16px",
                      background: "#1a2a1a", color: "#7ab870", borderRadius: 6,
                      fontSize: 11, letterSpacing: 1, textDecoration: "none", textTransform: "uppercase",
                    }}>Open in Google Maps →</a>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "#aaa", fontStyle: "italic" }}>
            No cafés match. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}

