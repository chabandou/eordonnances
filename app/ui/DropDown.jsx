"use client";

import { useState, useMemo } from "react";
import Arrow from "@/app/ui/icons/Arrow";
import styles from "./DropDown.module.css";
import clsx from "clsx";

export default function DropDown({ items, pathname, searchParams, replace }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get initial selected specialty from searchParams if exists
  const initialSpecialty = searchParams.get("specialty") || "";
  
  const handleFilter = (specialty) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (specialty) {
      params.set("specialty", specialty);
    } else {
      params.delete("specialty");
    }
    replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const selectedValue = useMemo(() => {
    const specialty = searchParams.get("specialty");
    return specialty || "Spécialités";
  }, [searchParams]);

  return (
    <div className={clsx(styles.dropdown, "w-full lg:w-1/3")}>
      <div 
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(styles.inputBox, isOpen && styles.open)}
      >
        {selectedValue}
      </div>
      <Arrow className={clsx(styles.arrow, isOpen && styles.open)} />

      <div className={clsx(
        styles.list, 
        isOpen && styles.open,
        "w-full lg:w-[300%] h-[75vh] lg:h-fit grid grid-cols-1 lg:grid-cols-3"
      )}>
        <div key="all">
          <input 
            onChange={() => handleFilter("")} 
            checked={!searchParams.get("specialty")}
            type="radio" 
            name="item" 
            id="all" 
            className={styles.radio} 
          />
          <label htmlFor="all">
            <span className="name">Tous</span>
          </label>
        </div>
        {items.map((item) => (
          <div key={item}>
            <input
              onChange={() => handleFilter(item)}
              checked={searchParams.get("specialty") === item}
              type="radio"
              name="item"
              id={item}
              className={styles.radio}
            />
            <label htmlFor={item}>
              <span className="name">{item}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
