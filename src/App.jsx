import { useState } from "react";

const C = {
  teal: "#3fb9bd",
  tealLight: "#E8F5F5",
  navy: "#2D3561",
  white: "#FFFFFF",
  bg: "#F4F7F9",
  border: "#E2EAF0",
  textMuted: "#8A93B8",
  red: "#EF4444",
};

const INITIAL_TEAM = [
  { id: "ab_jK890Lm", name: "Noémie", specialty: "Coiffeur", color: "#3fb9bd" },
  { id: "cd_xP234Rn", name: "Charlotte", specialty: "Coiffeur", color: "#2D3561" },
  { id: "ef_yQ567Ts", name: "Sophie", specialty: "Coloriste", color: "#8B5CF6" },
];

const CLIENTS = [
  { id: "7839f0ee", name: "COVAREL Mickael", phone: "+33 7 65 46 73 90", email: "adressemail@gmail.com", address: "Rue de la Liberté", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "19 / 08 / 1990", created: "22/04/2026", rdvCount: 4 },
  { id: "a4d21c83", name: "MARTIN Sophie", phone: "+33 6 12 34 57 89", email: "sophie.martin@gmail.com", address: "12 rue des Alpes", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "03 / 05 / 1985", created: "15/03/2026", rdvCount: 2 },
  { id: "e7b509f1", name: "DUBOIS Camille", phone: "+33 7 48 92 01 63", email: "camille.dubois@gmail.com", address: "5 avenue Foch", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "22 / 11 / 1992", created: "10/02/2026", rdvCount: 3 },
  { id: "c3190a7d", name: "BERNARD Léa", phone: "+33 6 85 27 43 10", email: "lea.bernard@gmail.com", address: "8 rue du Commerce", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "14 / 07 / 1988", created: "05/01/2026", rdvCount: 1 },
  { id: "f82e47b6", name: "MOREAU Julien", phone: "+33 7 61 09 38 24", email: "julien.moreau@gmail.com", address: "3 impasse des Pins", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "30 / 01 / 1995", created: "20/04/2026", rdvCount: 5 },
  { id: "9d0c51ae", name: "PETIT Clara", phone: "+33 6 39 54 72 81", email: "clara.petit@gmail.com", address: "17 rue Gambetta", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "08 / 03 / 1990", created: "12/03/2026", rdvCount: 2 },
  { id: "3b8f620d", name: "LEROY Aurélien", phone: "+33 7 22 76 45 93", email: "aurelien.leroy@gmail.com", address: "22 chemin du Moulin", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "25 / 09 / 1987", created: "08/04/2026", rdvCount: 3 },
  { id: "71a4e9c2", name: "SIMON Inès", phone: "+33 6 47 83 19 05", email: "ines.simon@gmail.com", address: "9 place de la Mairie", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "17 / 06 / 1993", created: "01/05/2026", rdvCount: 1 },
  { id: "d056b3f8", name: "LAURENT Manon", phone: "+33 7 93 61 28 47", email: "manon.laurent@gmail.com", address: "6 rue Victor Hugo", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "11 / 12 / 1991", created: "18/02/2026", rdvCount: 4 },
  { id: "8e29c7a1", name: "THOMAS Chloé", phone: "+33 6 58 14 67 32", email: "chloe.thomas@gmail.com", address: "14 rue Pasteur", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "29 / 04 / 1989", created: "25/03/2026", rdvCount: 2 },
  { id: "4f71d02e", name: "GARCIA José", phone: "+33 7 34 07 85 16", email: "jose.garcia@gmail.com", address: "11 allée des Roses", zip: "73300", city: "Saint-Jean-de-Maurienne", dob: "05 / 02 / 1982", created: "14/04/2026", rdvCount: 6 },
];

const INITIAL_CALLS = [
  { id: "7839f0ee", patient: "COVAREL Mickael", phone: "+33765467390", date: "10/06/2026", time: "12:29", tags: ["Traité", "Neutre", "Nouveau RDV"], summary: "M. Mickael Covarel a contacté le salon. L'agent conversationnel a pris en charge la demande et recueilli ses coordonnées. Un rendez-vous pour une coupe homme avec Noémie. Le rendez-vous a été proposé et confirmé au cours de l'échange.", agent: "Noémie", status: "Nouveau" },
  { id: "a4d21c83", patient: "DELATRE Marc", phone: "+33 6 12 34 57 89", date: "10/06/2026", time: "12:17", tags: ["Traité", "Neutre", "Annulation RDV"], summary: "M. Marc Delatre a contacté le salon afin d'annuler son rendez-vous avec Noémie pour une coupe Homme. L'agent conversationnel a pris en charge la demande, confirmé l'annulation et proposé une replanification. Le client n'a pas souhaité fixer un nouveau créneau lors de l'échange.", agent: "Noémie", status: "Nouveau" },
  { id: "e7b509f1", patient: "TOUR Lily", phone: "+33 7 48 92 01 63", date: "10/06/2026", time: "11:50", tags: ["Traité", "Neutre", "Informations"], summary: "Mme Lily Tour a contacté le salon pour connaître la date de son prochain rendez-vous avec Charlotte. L'agent conversationnel a consulté l'agenda et lui a communiqué l'information.", agent: "Charlotte", status: "Nouveau" },
  { id: "c3190a7d", patient: "MARTIN Sophie", phone: "+33 6 85 27 43 10", date: "10/06/2026", time: "11:38", tags: ["À rappeler", "Neutre", "Informations"], summary: "Mme Sophie Martin a contacté pour se renseigner sur une coiffure de mariage. L'agent conversationnel a recueilli sa demande ainsi que ses coordonnées, et l'a informée que ce type de prestation événementielle nécessitait un échange personnalisé avec l'équipe du salon.", agent: "Noémie", status: "Nouveau" },
];

// Base date: Monday June 9 2026
const BASE_DATE = new Date(2026, 5, 9);

function getWeekStart(offset) {
  const d = new Date(BASE_DATE);
  d.setDate(d.getDate() + offset * 7);
  return d;
}

function buildRdvDate(weekOffset, dayIndex, hour) {
  const d = getWeekStart(weekOffset);
  d.setDate(d.getDate() + dayIndex);
  return { weekOffset, dayIndex, hour };
}

const INITIAL_RDV = [
  // Semaine 0 (9 juin)
  { id: "rdv1", patient: "COVAREL Mickael", agent: "Noémie", weekOffset: 0, dayIndex: 0, hour: 9, duration: 1, label: "Coupe homme" },
  { id: "rdv2", patient: "TOUR Lily", agent: "Charlotte", weekOffset: 0, dayIndex: 1, hour: 14, duration: 1, label: "Brushing" },
  { id: "rdv3", patient: "BERNARD Léa", agent: "Sophie", weekOffset: 0, dayIndex: 2, hour: 10, duration: 2, label: "Coloration" },
  { id: "rdv4", patient: "PETIT Clara", agent: "Noémie", weekOffset: 0, dayIndex: 3, hour: 11, duration: 1, label: "Coupe femme" },
  { id: "rdv5", patient: "MOREAU Julien", agent: "Charlotte", weekOffset: 0, dayIndex: 0, hour: 15, duration: 1, label: "Coupe homme" },
  { id: "rdv6", patient: "MARTIN Sophie", agent: "Sophie", weekOffset: 0, dayIndex: 1, hour: 9, duration: 2, label: "Balayage" },
  { id: "rdv7", patient: "DUBOIS Camille", agent: "Noémie", weekOffset: 0, dayIndex: 4, hour: 10, duration: 1, label: "Coupe femme" },
  { id: "rdv8", patient: "GARCIA José", agent: "Charlotte", weekOffset: 0, dayIndex: 4, hour: 14, duration: 1, label: "Coupe homme" },
  { id: "rdv9", patient: "SIMON Inès", agent: "Sophie", weekOffset: 0, dayIndex: 5, hour: 11, duration: 2, label: "Coloration" },
  { id: "rdv10", patient: "LEROY Aurélien", agent: "Noémie", weekOffset: 0, dayIndex: 2, hour: 16, duration: 1, label: "Coupe homme" },
  // Semaine 1 (16 juin)
  { id: "rdv11", patient: "THOMAS Chloé", agent: "Charlotte", weekOffset: 1, dayIndex: 0, hour: 9, duration: 1, label: "Brushing" },
  { id: "rdv12", patient: "COVAREL Mickael", agent: "Noémie", weekOffset: 1, dayIndex: 1, hour: 11, duration: 1, label: "Coupe homme" },
  { id: "rdv13", patient: "LAURENT Manon", agent: "Sophie", weekOffset: 1, dayIndex: 2, hour: 14, duration: 2, label: "Balayage" },
  { id: "rdv14", patient: "PETIT Clara", agent: "Charlotte", weekOffset: 1, dayIndex: 3, hour: 10, duration: 1, label: "Coupe femme" },
  { id: "rdv15", patient: "BERNARD Léa", agent: "Noémie", weekOffset: 1, dayIndex: 4, hour: 15, duration: 1, label: "Brushing" },
  { id: "rdv16", patient: "GARCIA José", agent: "Sophie", weekOffset: 1, dayIndex: 0, hour: 14, duration: 1, label: "Coloration" },
  { id: "rdv17", patient: "MOREAU Julien", agent: "Charlotte", weekOffset: 1, dayIndex: 5, hour: 9, duration: 1, label: "Coupe homme" },
  { id: "rdv18", patient: "SIMON Inès", agent: "Noémie", weekOffset: 1, dayIndex: 1, hour: 16, duration: 1, label: "Coupe femme" },
  // Semaine 2 (23 juin)
  { id: "rdv19", patient: "DUBOIS Camille", agent: "Sophie", weekOffset: 2, dayIndex: 0, hour: 10, duration: 2, label: "Balayage" },
  { id: "rdv20", patient: "THOMAS Chloé", agent: "Noémie", weekOffset: 2, dayIndex: 2, hour: 9, duration: 1, label: "Coupe femme" },
  { id: "rdv21", patient: "MARTIN Sophie", agent: "Charlotte", weekOffset: 2, dayIndex: 3, hour: 14, duration: 1, label: "Brushing" },
  { id: "rdv22", patient: "LEROY Aurélien", agent: "Sophie", weekOffset: 2, dayIndex: 4, hour: 11, duration: 1, label: "Coupe homme" },
  { id: "rdv23", patient: "LAURENT Manon", agent: "Noémie", weekOffset: 2, dayIndex: 1, hour: 15, duration: 1, label: "Coupe femme" },
  // Semaine -1 (2 juin)
  { id: "rdv24", patient: "COVAREL Mickael", agent: "Charlotte", weekOffset: -1, dayIndex: 0, hour: 10, duration: 1, label: "Coupe homme" },
  { id: "rdv25", patient: "BERNARD Léa", agent: "Noémie", weekOffset: -1, dayIndex: 2, hour: 14, duration: 2, label: "Coloration" },
  { id: "rdv26", patient: "GARCIA José", agent: "Sophie", weekOffset: -1, dayIndex: 4, hour: 9, duration: 1, label: "Coupe homme" },
];

const STATUS_FILTERS = ["Nouveau", "Non Qualifié", "En cours", "Traité", "Rendez-vous", "Toutes", "Archives"];
const CHANNEL_TABS = ["Appels", "Emails", "WhatsApp"];
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8h → 18h

const TAG_COLORS = {
  "Traité": { bg: "#DCFCE7", color: "#16A34A" },
  "Neutre": { bg: "#F1F5F9", color: "#64748B" },
  "Nouveau RDV": { bg: "#DCFCE7", color: "#16A34A" },
  "Annulation RDV": { bg: "#FEE2E2", color: "#DC2626" },
  "Informations": { bg: "#E0F2FE", color: "#0284C7" },
  "À rappeler": { bg: "#FEF3C7", color: "#D97706" },
};

function Tag({ label }) {
  const s = TAG_COLORS[label] || { bg: C.tealLight, color: C.teal };
  return <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>{label}</span>;
}

function StatusDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ padding: "4px 10px", background: C.tealLight, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12, color: C.navy, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, fontFamily: "inherit", fontWeight: 800, width: "100%" }}>
        {value} <span style={{ fontSize: 9 }}>▼</span>
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: "110%", background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, zIndex: 100, minWidth: 130, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          {options.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }} style={{ padding: "8px 14px", fontSize: 12, color: C.navy, cursor: "pointer", fontWeight: o === value ? 700 : 400, background: o === value ? C.tealLight : "transparent" }}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{value}</div>
    </div>
  );
}

function Sidebar({ page, setPage, newCount }) {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { id: "dashboard", label: "Accueil", icon: "⊞", badge: newCount },
    { id: "calendrier", label: "Calendrier", icon: "📅" },
    { id: "clients", label: "Clients", icon: "👤" },
  ];

  const w = collapsed ? 64 : 200;

  return (
    <div style={{ width: w, minWidth: w, background: C.teal, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", transition: "width 0.25s ease, min-width 0.25s ease", overflow: "hidden" }}>

      {/* Header : burger + logo */}
      <div style={{ padding: collapsed ? "18px 0" : "18px 16px", borderBottom: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", gap: 10 }}>
        {!collapsed && (
          src="/Logo_Livvia_Blanc_Seul.png" height={40} alt="Livvia" style={{ objectFit: "contain", flexShrink: 0 }}
        )}
        {collapsed && (
          <img src="/Icone_Logo_Livvia_Blanc.png" height={28} alt="Livvia" style={{ objectFit: "contain", flexShrink: 0 }} />
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, cursor: "pointer", padding: "5px 7px", display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}
        >
          <span style={{ width: 16, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />
          <span style={{ width: 16, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />
          <span style={{ width: 16, height: 2, background: "#fff", borderRadius: 2, display: "block" }} />
        </button>
      </div>

      {/* Nav items */}
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {items.map((item, index) => (
          <div key={item.id}>
            <div
              onClick={() => setPage(item.id)}
              title={collapsed ? item.label : ""}
              style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 12, padding: collapsed ? "13px 0" : "12px 20px", justifyContent: collapsed ? "center" : "flex-start", cursor: "pointer", color: "#ffffff", fontWeight: page === item.id ? 800 : 600, fontSize: 14, borderLeft: page === item.id ? "3px solid #ffffff" : "3px solid transparent", background: page === item.id ? "rgba(255,255,255,0.15)" : "transparent", position: "relative", transition: "all 0.2s" }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
              {!collapsed && item.badge > 0 && <span style={{ background: C.red, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{item.badge}</span>}
              {collapsed && item.badge > 0 && <span style={{ position: "absolute", top: 8, right: 8, background: C.red, color: "#fff", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800 }}>{item.badge}</span>}
            </div>
            {index < items.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: collapsed ? "0 10px" : "0 20px" }} />}
          </div>
        ))}
      </nav>

      {/* Bottom : Mon Établissement + infos */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <div
          onClick={() => setPage("salon")}
          title={collapsed ? "Mon Établissement" : ""}
          style={{ display: "flex", alignItems: "center", gap: collapsed ? 0 : 12, padding: collapsed ? "13px 0" : "14px 20px", justifyContent: collapsed ? "center" : "flex-start", cursor: "pointer", color: "#ffffff", fontWeight: page === "salon" ? 800 : 600, fontSize: 14, borderLeft: page === "salon" ? "3px solid #ffffff" : "3px solid transparent", background: page === "salon" ? "rgba(255,255,255,0.15)" : "transparent" }}
        >
          <span style={{ fontSize: 18 }}>⚙️</span>
          {!collapsed && <span>Mon Établissement</span>}
        </div>
        {!collapsed && (
          <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.2)", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
            <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: 2 }}>Studio Éclat</div>
            <div>Tableau de bord cabinet</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CALENDAR PAGE ─────────────────────────────────────────────────────────────
const MONTH_NAMES = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

function CalendarPage({ rdvs, setRdvs, team }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newRdv, setNewRdv] = useState({ patient: "", agent: team[0]?.name || "", dayIndex: 0, hour: 9, duration: 1, label: "" });

  const getTeamColor = (name) => team.find(m => m.name === name)?.color || C.teal;

  const weekStart = new Date(BASE_DATE);
  weekStart.setDate(weekStart.getDate() + weekOffset * 7);

  const weekDates = DAYS.map((_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const weekLabel = () => {
    const first = weekDates[0];
    const last = weekDates[5];
    if (first.getMonth() === last.getMonth()) return `${first.getDate()} – ${last.getDate()} ${MONTH_NAMES[first.getMonth()]} ${first.getFullYear()}`;
    return `${first.getDate()} ${MONTH_NAMES[first.getMonth()]} – ${last.getDate()} ${MONTH_NAMES[last.getMonth()]} ${last.getFullYear()}`;
  };

  const weekRdvs = rdvs.filter(r => r.weekOffset === weekOffset);

  const addRdv = () => {
    if (!newRdv.patient || !newRdv.label) return;
    setRdvs(prev => [...prev, { ...newRdv, weekOffset, id: "rdv_" + Date.now() }]);
    setShowModal(false);
    setNewRdv({ patient: "", agent: team[0]?.name || "", dayIndex: 0, hour: 9, duration: 1, label: "" });
  };

  return (
    <>
      <div style={{ padding: "16px 28px 0", background: C.white, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setWeekOffset(w => w - 1)} style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${C.border}`, background: C.white, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: C.navy }}>‹</button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.navy, minWidth: 280, textAlign: "center" }}>Semaine du {weekLabel()}</h2>
            <button onClick={() => setWeekOffset(w => w + 1)} style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${C.border}`, background: C.white, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: C.navy }}>›</button>
            {weekOffset !== 0 && <button onClick={() => setWeekOffset(0)} style={{ padding: "5px 14px", border: `1px solid ${C.teal}`, borderRadius: 20, background: C.white, color: C.teal, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Aujourd'hui</button>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", gap: 12 }}>
              {team.map(m => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.navy }}>{m.name}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal(true)} style={{ padding: "8px 18px", background: C.teal, border: "none", borderRadius: 20, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>+ Nouveau RDV</button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "auto" }}>
        <div style={{ minWidth: 800, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(6, 1fr)", borderBottom: `1px solid ${C.border}`, background: C.white, position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ padding: "10px 0" }} />
            {DAYS.map((d, i) => {
              const date = weekDates[i];
              const isToday = weekOffset === 0 && i === 0;
              return (
                <div key={d} style={{ padding: "10px 8px", textAlign: "center", fontSize: 13, fontWeight: 700, color: isToday ? C.teal : C.navy, borderLeft: `1px solid ${C.border}`, background: isToday ? C.tealLight : "transparent" }}>
                  <div>{d}</div>
                  <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 500, color: isToday ? C.teal : C.textMuted }}>{date.getDate()} {MONTH_NAMES[date.getMonth()]}</div>
                </div>
              );
            })}
          </div>

          {HOURS.map(hour => (
            <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px repeat(6, 1fr)", borderBottom: `1px solid ${C.border}`, minHeight: 70 }}>
              <div style={{ padding: "8px 8px 0", fontSize: 11, color: C.textMuted, textAlign: "right", borderRight: `1px solid ${C.border}` }}>{hour}:00</div>
              {DAYS.map((_, dayIdx) => {
                const dayRdvs = weekRdvs.filter(r => r.dayIndex === dayIdx && r.hour === hour);
                const isToday = weekOffset === 0 && dayIdx === 0;
                return (
                  <div key={dayIdx} style={{ borderLeft: `1px solid ${C.border}`, padding: "4px", background: isToday ? "rgba(63,185,189,0.03)" : "transparent" }}>
                    {dayRdvs.map(rdv => (
                      <div key={rdv.id} style={{ background: getTeamColor(rdv.agent), borderRadius: 6, padding: "5px 8px", marginBottom: 3, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{rdv.patient}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.85)" }}>{rdv.label} • {rdv.agent}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 32, width: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: C.navy }}>Nouveau rendez-vous</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["Patient", "patient", "Nom du patient"], ["Prestation", "label", "Ex: Coupe homme, Coloration…"]].map(([label, field, ph]) => (
                <div key={field}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>{label}</div>
                  <input value={newRdv[field]} onChange={e => setNewRdv(p => ({ ...p, [field]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>Membre</div>
                  <select value={newRdv.agent} onChange={e => setNewRdv(p => ({ ...p, agent: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }}>
                    {team.map(m => <option key={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>Jour</div>
                  <select value={newRdv.dayIndex} onChange={e => setNewRdv(p => ({ ...p, dayIndex: Number(e.target.value) }))} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }}>
                    {DAYS.map((d, i) => <option key={d} value={i}>{d} {weekDates[i]?.getDate()} {MONTH_NAMES[weekDates[i]?.getMonth()]}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>Heure</div>
                  <select value={newRdv.hour} onChange={e => setNewRdv(p => ({ ...p, hour: Number(e.target.value) }))} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }}>
                    {HOURS.map(h => <option key={h} value={h}>{h}:00</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 4 }}>Durée</div>
                  <select value={newRdv.duration} onChange={e => setNewRdv(p => ({ ...p, duration: Number(e.target.value) }))} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }}>
                    {[1, 2, 3].map(d => <option key={d} value={d}>{d}h</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "11px", border: `1px solid ${C.border}`, borderRadius: 10, background: C.white, color: C.navy, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Annuler</button>
              <button onClick={addRdv} style={{ flex: 2, padding: "11px", border: "none", borderRadius: 10, background: C.teal, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Ajouter →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── SMS MODAL ────────────────────────────────────────────────────────────────
function SmsModal({ patient, phone, onClose }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const generateAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `Génère un SMS professionnel et chaleureux de la part du Studio Éclat à destination de ${patient}. 
Le SMS doit confirmer ou rappeler un rendez-vous. Maximum 160 caractères. 
Réponds uniquement avec le texte du SMS, sans guillemets ni explication.`
          }]
        }),
      });
      const data = await res.json();
      setMessage(data.content?.[0]?.text || "");
    } catch {
      setMessage("Bonjour, nous vous rappelons votre rendez-vous au Studio Éclat. À bientôt !");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(3px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", fontFamily: "'Nunito', sans-serif" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.navy }}>✉️ Envoyer un SMS</h3>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", background: "#F1F5F9", border: "none", cursor: "pointer", fontSize: 14, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Destinataire */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Destinataire</div>
            <input readOnly value={patient} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: C.navy, background: "#F8FAFC", outline: "none", fontFamily: "inherit" }} />
          </div>

          {/* Téléphone */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Numéro de téléphone</div>
            <input readOnly value={phone} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.navy, background: "#F8FAFC", outline: "none", fontFamily: "inherit" }} />
          </div>

          {/* Message */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</div>
              <span style={{ fontSize: 11, color: message.length > 140 ? C.red : C.textMuted }}>{message.length}/160</span>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Écrivez votre message ici..."
              rows={4}
              style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          {/* Bouton IA */}
          <button onClick={generateAI} disabled={loading} style={{ padding: "10px 16px", background: C.tealLight, border: `1.5px solid ${C.teal}`, borderRadius: 10, color: C.teal, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Génération en cours..." : "✨ Générer un message avec l'IA"}
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", border: `1px solid ${C.border}`, borderRadius: 10, background: "#fff", color: C.navy, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Annuler</button>
          <button onClick={handleSend} style={{ flex: 2, padding: "12px", border: "none", borderRadius: 10, background: sent ? "#0e9e40" : C.teal, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            {sent ? "✓ SMS envoyé !" : "Envoyer →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SALON PAGE ────────────────────────────────────────────────────────────────
function SalonPage({ team, setTeam }) {
  const [tab, setTab] = useState("infos");
  const [hours, setHours] = useState({
    Lundi: { open: "", close: "" }, Mardi: { open: "", close: "" }, Mercredi: { open: "", close: "" },
    Jeudi: { open: "", close: "" }, Vendredi: { open: "", close: "" }, Samedi: { open: "", close: "" },
  });
  const [saved, setSaved] = useState(false);

  const addMember = () => {
    const newId = "mb_" + Math.random().toString(36).substr(2, 8);
    setTeam(prev => [...prev, { id: newId, name: "Nouveau membre", specialty: "Coiffeur", color: "#3fb9bd" }]);
  };
  const removeMember = (id) => setTeam(prev => prev.filter(m => m.id !== id));
  const updateMember = (id, field, value) => setTeam(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <>
      <div style={{ padding: "28px 36px 0", background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: C.navy, letterSpacing: "-1px" }}>Mon Établissement</h1>
          <button onClick={handleSave} style={{ padding: "6px 20px", border: `1px solid ${C.border}`, borderRadius: 20, background: saved ? C.teal : C.white, color: saved ? "#fff" : C.navy, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            {saved ? "Sauvegardé ✓" : "Sauvegarder"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["infos", "equipe"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 4px", border: "none", borderBottom: tab === t ? `2px solid ${C.navy}` : "2px solid transparent", background: "transparent", fontSize: 14, fontWeight: tab === t ? 700 : 500, color: tab === t ? C.navy : C.textMuted, cursor: "pointer", fontFamily: "inherit", marginBottom: -1 }}>
              {t === "infos" ? "Informations" : "Équipe"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
        {tab === "infos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
            {[["Nom du salon", "Studio Éclat"], ["Adresse", "540 Avenue de la République, 73300 Saint-Jean-de-Maurienne"]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{label}</div>
                <input defaultValue={val} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontWeight: label === "Nom du salon" ? 700 : 400, color: C.navy, outline: "none", fontFamily: "inherit" }} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10 }}>Horaires d'ouverture</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {Object.keys(hours).map(day => (
                  <div key={day} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{day}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input value={hours[day].open} onChange={e => setHours(h => ({ ...h, [day]: { ...h[day], open: e.target.value } }))} placeholder="--:--" style={{ width: 60, padding: "6px 8px", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.navy, outline: "none", fontFamily: "inherit", textAlign: "center" }} />
                      <span style={{ color: C.textMuted }}>-</span>
                      <input value={hours[day].close} onChange={e => setHours(h => ({ ...h, [day]: { ...h[day], close: e.target.value } }))} placeholder="--:--" style={{ width: 60, padding: "6px 8px", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.navy, outline: "none", fontFamily: "inherit", textAlign: "center" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[["ID Salon", "ID_37YHju890jKL"], ["ID Agent", "ID_37YHju890jKL"]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{label}</div>
                  <input readOnly defaultValue={val} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit", background: "#F8FAFC" }} />
                </div>
              ))}
            </div>
            <div style={{ maxWidth: 440 }}>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>Numéro de Téléphone attribué</div>
              <input readOnly defaultValue="+33909077656" style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit", background: "#F8FAFC" }} />
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>Identifiant unique de l'agent (ne peut être modifié)</div>
            </div>
          </div>
        )}
        {tab === "equipe" && (
          <div style={{ maxWidth: 900 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.navy, marginBottom: 16 }}>Équipe</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {team.map(member => (
                <div key={member.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", position: "relative" }}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 12, fontFamily: "monospace" }}>{member.id}</div>
                  <button onClick={() => removeMember(member.id)} style={{ position: "absolute", top: 14, right: 14, width: 24, height: 24, borderRadius: "50%", background: "#FEE2E2", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 6 }}>Nom / Prénom</div>
                      <input value={member.name} onChange={e => updateMember(member.id, "name", e.target.value)} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontWeight: 700, color: C.navy, outline: "none", fontFamily: "inherit" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 6 }}>Spécialité</div>
                      <select value={member.specialty} onChange={e => updateMember(member.id, "specialty", e.target.value)} style={{ width: "100%", padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontWeight: 700, color: C.navy, outline: "none", fontFamily: "inherit", background: C.white }}>
                        <option>Coiffeur</option><option>Coloriste</option><option>Barbier</option><option>Esthéticienne</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ maxWidth: "50%" }}>
                    <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, marginBottom: 6 }}>Couleur dans l'agenda</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input value={member.color} onChange={e => updateMember(member.id, "color", e.target.value)} style={{ flex: 1, padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.navy, outline: "none", fontFamily: "inherit" }} />
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: member.color, flexShrink: 0, border: `1px solid ${C.border}` }} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addMember} style={{ padding: "12px", border: "2px dashed #E2EAF0", borderRadius: 12, background: "transparent", color: C.textMuted, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                + Ajouter un membre
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [channel, setChannel] = useState("Appels");
  const [statusFilter, setStatusFilter] = useState("Nouveau");
  const [calls, setCalls] = useState(INITIAL_CALLS);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientTab, setClientTab] = useState("infos");
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [rdvs, setRdvs] = useState(INITIAL_RDV);
  const [smsModal, setSmsModal] = useState(null); // { patient, phone }

  const updateCall = (id, field, value) => {
    setCalls(prev => prev.map(c => {
      if (c.id !== id) return c;
      // Si on passe en statut "Rendez-vous" → ajouter au calendrier
      if (field === "status" && value === "Rendez-vous") {
        const call = prev.find(c => c.id === id);
        if (call) {
          setRdvs(r => [...r, {
            id: "rdv_" + Date.now(),
            patient: call.patient,
            agent: call.agent,
            weekOffset: 0,
            dayIndex: 0,
            hour: 9,
            duration: 1,
            label: "RDV confirmé",
          }]);
        }
      }
      return { ...c, [field]: value };
    }));
  };

  const archiveCall = (id) => setCalls(prev => prev.map(c => c.id === id ? { ...c, archived: true } : c));
  const newCount = calls.filter(c => !c.archived && c.status === "Nouveau").length;

  const visibleCalls = calls.filter(c => {
    if (statusFilter === "Toutes") return !c.archived;
    if (statusFilter === "Archives") return c.archived;
    return !c.archived && c.status === statusFilter;
  });

  const filteredClients = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.id.includes(search)
  );

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Nunito', 'Helvetica Neue', sans-serif", background: C.bg, overflow: "hidden" }}>
      <Sidebar page={page} setPage={(p) => { setPage(p); setSelectedClient(null); }} newCount={newCount} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── DASHBOARD ── */}
        {page === "dashboard" && (
          <>
            <div style={{ padding: "28px 36px 0", background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <h1 style={{ margin: "0 0 20px", fontSize: 32, fontWeight: 800, color: C.navy, textAlign: "center", letterSpacing: "-1px" }}>Dashboard</h1>
              <div style={{ display: "flex", gap: 4 }}>
                {CHANNEL_TABS.map(tab => (
                  <button key={tab} onClick={() => setChannel(tab)} style={{ padding: "8px 20px", borderRadius: "8px 8px 0 0", border: `1px solid ${C.border}`, borderBottom: tab === channel ? "none" : `1px solid ${C.border}`, background: tab === channel ? C.teal : C.white, color: tab === channel ? C.white : C.navy, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{tab}</button>
                ))}
              </div>
            </div>
            <div style={{ background: C.white, padding: "10px 36px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 8 }}>
                {STATUS_FILTERS.map(f => (
                  <button key={f} onClick={() => setStatusFilter(f)} style={{ flex: 1, padding: "8px 12px", border: `1px solid ${f === statusFilter ? C.navy : "rgba(45,53,97,0.2)"}`, background: f === statusFilter ? C.navy : "rgba(45,53,97,0.08)", color: f === statusFilter ? C.white : C.navy, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit", borderRadius: 999, transition: "all 0.15s" }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ background: C.white, padding: "10px 36px", borderBottom: `2px solid ${C.border}`, display: "flex", gap: 10 }}>
              {["Tous", "Tous", "Tous", "Tous", "Tous", "Tous"].map((v, i) => (
                <div key={i} style={{ flex: 1, padding: "7px 16px", border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 12, color: C.navy, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, cursor: "pointer", background: C.white }}>{v} <span style={{ fontSize: 9, color: C.textMuted }}>▼</span></div>
              ))}
            </div>
            <div style={{ padding: "10px 36px", display: "flex", gap: 16, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <div style={{ width: 90, fontSize: 12, fontWeight: 800, color: C.navy }}>ID Appel</div>
              <div style={{ width: 160, fontSize: 12, fontWeight: 800, color: C.navy }}>Patient</div>
              <div style={{ flex: 1, fontSize: 12, fontWeight: 800, color: C.navy }}>Résumé</div>
              <div style={{ width: 160 }} />
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 24px" }}>
              {visibleCalls.length === 0 && <div style={{ textAlign: "center", padding: "60px 0", color: C.textMuted, fontSize: 14 }}>Aucune interaction dans cette catégorie.</div>}
              {visibleCalls.map(call => (
                <div key={call.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, margin: "12px 0", padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 90, flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: C.teal, fontWeight: 400, fontFamily: "monospace" }}>{call.id}</div>
                  </div>
                  <div style={{ width: 160, flexShrink: 0 }}>
                    <div onClick={() => { const client = CLIENTS.find(c => c.id === call.id || call.patient.includes(c.name.split(" ")[0])); if (client) { setSelectedClient(client); setClientTab("infos"); setPage("clients"); } }} style={{ fontSize: 13, fontWeight: 800, color: C.navy, cursor: "pointer", textDecoration: "underline" }}>{call.patient}</div>
                    <div style={{ fontSize: 11, color: C.navy, fontWeight: 800, marginTop: 2 }}>{call.phone}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{call.date} | {call.time}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>{call.tags.map(t => <Tag key={t} label={t} />)}</div>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#444", lineHeight: 1.6 }}>{call.summary}</p>
                  </div>
                  <div style={{ width: 160, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    <StatusDropdown value={call.agent} onChange={v => updateCall(call.id, "agent", v)} options={team.map(m => m.name)} />
                    <StatusDropdown value={call.status} onChange={v => updateCall(call.id, "status", v)} options={["Nouveau", "Non Qualifié", "En cours", "Traité", "Rendez-vous"]} />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setSmsModal({ patient: call.patient, phone: call.phone })} style={{ padding: "4px 10px", background: C.teal, border: "1px solid #2da8ac", borderRadius: 6, fontSize: 12, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, flex: 1 }}>SMS</button>
                      <button onClick={() => archiveCall(call.id)} style={{ padding: "4px 10px", background: C.teal, border: "1px solid #2da8ac", borderRadius: 6, fontSize: 12, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, flex: 1 }}>Archiver</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CALENDRIER ── */}
        {page === "calendrier" && <CalendarPage rdvs={rdvs} setRdvs={setRdvs} team={team} />}

        {/* ── CLIENTS ── */}
        {page === "clients" && !selectedClient && (
          <>
            <div style={{ padding: "28px 36px 20px", background: C.white, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: C.navy, letterSpacing: "-1px" }}>Clients</h1>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ width: 32, height: 32, borderRadius: "50%", background: C.teal, border: "none", color: C.white, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                <button style={{ padding: "6px 16px", border: `1px solid ${C.border}`, borderRadius: 20, background: C.white, fontSize: 12, color: C.navy, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Exporter CSV</button>
              </div>
            </div>
            <div style={{ padding: "16px 36px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Recherche par nom, téléphone ..." style={{ padding: "8px 16px", border: `1px solid ${C.border}`, borderRadius: 20, fontSize: 13, color: C.navy, outline: "none", fontFamily: "inherit", width: 280 }} />
            </div>
            <div style={{ padding: "12px 36px", display: "flex", gap: 16, borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              {["ID Appel", "Patient", "Téléphone", "Action"].map((h, i) => (
                <div key={h} style={{ fontSize: 12, fontWeight: 800, color: C.navy, width: i === 0 ? 100 : i === 1 ? 180 : i === 3 ? 180 : "auto", flex: i === 2 ? 1 : 0 }}>{h}</div>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 24px" }}>
              {filteredClients.map(client => (
                <div key={client.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, margin: "8px 0", padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div style={{ width: 100, fontSize: 12, color: C.teal, fontWeight: 700, fontFamily: "monospace" }}>{client.id}</div>
                  <div style={{ width: 180, fontSize: 13, fontWeight: 800, color: C.navy }}>{client.name}</div>
                  <div style={{ flex: 1, fontSize: 13, color: C.navy }}>{client.phone}</div>
                  <div style={{ width: 180, display: "flex", gap: 8 }}>
                    <button style={{ padding: "5px 14px", border: `1px solid ${C.border}`, borderRadius: 20, background: C.white, fontSize: 12, color: C.navy, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>+RDV</button>
                    <button onClick={() => { setSelectedClient(client); setClientTab("infos"); }} style={{ padding: "5px 14px", border: "none", borderRadius: 20, background: C.teal, fontSize: 12, color: C.white, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Ouvrir</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FICHE CLIENT ── */}
        {page === "clients" && selectedClient && (
          <>
            <div style={{ padding: "28px 36px 0", background: C.white, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: C.navy, letterSpacing: "-1px" }}>Clients</h1>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ padding: "6px 18px", border: `1px solid ${C.border}`, borderRadius: 20, background: C.white, fontSize: 12, color: C.navy, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Modifier</button>
                  <button onClick={() => setSelectedClient(null)} style={{ width: 30, height: 30, borderRadius: "50%", background: C.teal, border: "none", color: C.white, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                {["infos", "rdv"].map(t => (
                  <button key={t} onClick={() => setClientTab(t)} style={{ padding: "8px 4px", border: "none", borderBottom: clientTab === t ? `2px solid ${C.navy}` : "2px solid transparent", background: "transparent", fontSize: 14, fontWeight: clientTab === t ? 700 : 500, color: clientTab === t ? C.navy : C.textMuted, cursor: "pointer", fontFamily: "inherit", marginBottom: -1 }}>
                    {t === "infos" ? "Informations" : "Rendez-vous"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
              {clientTab === "infos" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 40px" }}>
                  <InfoField label="Nom Prénom" value={selectedClient.name} />
                  <InfoField label="Rendez-vous cette année" value={selectedClient.rdvCount} />
                  <InfoField label="Créé le" value={selectedClient.created} />
                  <InfoField label="Référence" value={selectedClient.id} />
                  <InfoField label="Email" value={selectedClient.email} />
                  <InfoField label="Téléphone" value={selectedClient.phone} />
                  <InfoField label="Adresse" value={selectedClient.address} />
                  <InfoField label="Code Postal" value={selectedClient.zip} />
                  <InfoField label="Ville" value={selectedClient.city} />
                  <InfoField label="Date de naissance" value={selectedClient.dob} />
                </div>
              )}
              {clientTab === "rdv" && (
                <div style={{ color: C.textMuted, textAlign: "center", padding: "40px 0", fontSize: 14 }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📅</div>
                  Aucun rendez-vous enregistré pour ce client.
                </div>
              )}
            </div>
          </>
        )}

        {/* ── MON ÉTABLISSEMENT ── */}
        {page === "salon" && <SalonPage team={team} setTeam={setTeam} />}

      </div>

      {/* ── SMS MODAL ── */}
      {smsModal && <SmsModal patient={smsModal.patient} phone={smsModal.phone} onClose={() => setSmsModal(null)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #D8EEEE; border-radius: 3px; }
      `}</style>
    </div>
  );
}
