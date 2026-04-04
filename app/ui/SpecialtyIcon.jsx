"use client";

import Lungs from "./icons/Lungs";
import Brain from "./icons/Brain";
import Skin from "./icons/Skin";
import Ambulance from "./icons/Ambulance";
import Stomach from "./icons/Stomach";
import Heart from "./icons/Heart";
import Uterus from "./icons/Uterus";
import Throat from "./icons/Throat";
import Bladder from "./icons/Bladder";
import Stetho from "./index/Stetho";
import Scalpel from "./icons/Scalpel";

const iconMap = {
  "Dermatologie": Skin,
  "Cardiologie": Heart,
  "Gastro-entérologie": Stomach,
  "Urologie": Bladder,
  "Neurologie": Brain,
  "Pneumologie": Lungs,
  "Gynéco-Obstétrique": Uterus,
  "Gynécologie": Uterus,
  "Oto-rhino-laryngologie": Throat,
  "ORL": Throat,
  "Urgences": Ambulance,
  "Chirurgie": Scalpel,
};

export default function SpecialtyIcon({ specialty, className }) {
  const Icon = iconMap[specialty] || Stetho;
  return <Icon className={className} />;
}
