export const SPECIALTY_COLORS = {
  "Dermatologie": { g1: "#ff9d7e", g2: "hsl(12, 59%, 70%)", g3: "#49537d" },
  "Chirurgie": { g1: "#2b2d42", g2: "#8d99ae", g3: "#edf2f4" },
  "Cardiologie": { g1: "#d90429", g2: "#ef233c", g3: "#a8dadc" },
  "Neurologie": { g1: "#f48c06", g2: "#faa307", g3: "#ffddd2" },
  "Gynéco-Obstétrique": { g1: "#ff7096", g2: "#ff477e", g3: "#ff0a54" },
  "Gastro-entérologie": { g1: "#b88b4a", g2: "#754043", g3: "#533e2d" },
  "Urologie": { g1: "#9d4edd", g2: "#4361ee", g3: "#3a0ca3" },
  "Oto-rhino-laryngologie": { g1: "#3793ff", g2: "#0017e4", g3: "hsl(239, 94%, 25%)" },
  "Urgences": { g1: "#ff4757", g2: "#dc2626", g3: "#7f1d1d" },
  "Pneumologie": { g1: "#00c7a9", g2: "#008148", g3: "#133c55" }, // Default/Fallback
};

export const getSpecialtyColors = (specialty) => {
  return SPECIALTY_COLORS[specialty] || SPECIALTY_COLORS["Pneumologie"];
};
