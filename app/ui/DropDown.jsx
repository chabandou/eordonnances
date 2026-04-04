"use client";
import { useState, useMemo } from "react";
import styles from "./DropDown.module.css";
import clsx from "clsx";
import SpecialtyIcon from "./SpecialtyIcon";
import { getSpecialtyColors } from "@/app/libs/specialties";

export default function DropDown({ items, pathname, searchParams, replace }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const selectedSpecialty = searchParams.get("specialty");
  const colors = getSpecialtyColors(selectedSpecialty);

  const selectedValue = useMemo(() => {
    return selectedSpecialty || "All specialties";
  }, [selectedSpecialty]);

  return (
    <div className={styles.dropdown}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.inputBox}
        style={{
          backgroundColor: selectedSpecialty ? colors.g1 : "#3ddcc5"
        }}
      >
        <div className={styles.iconWrapper}>
          <SpecialtyIcon specialty={selectedSpecialty} className="w-full h-full text-white" />
        </div>
        <span>{selectedValue}</span>
      </div>

      <div className={clsx(
        styles.list,
        isOpen && styles.open,
      )}>
        <div className={styles.dropdownItem} key="all">
          <input
            onChange={() => handleFilter("")}
            checked={!selectedSpecialty}
            type="radio"
            name="item"
            id="all"
            className={styles.radio}
          />
          <label className={styles.label} htmlFor="all">
            <SpecialtyIcon specialty="" className={styles.itemIcon} />
            Tous
          </label>
        </div>
        {items.map((item) => (
          <div className={styles.dropdownItem} key={item}>
            <input
              onChange={() => handleFilter(item)}
              checked={selectedSpecialty === item}
              type="radio"
              name="item"
              id={item}
              className={styles.radio}
            />
            <label className={styles.label} htmlFor={item}>
              <SpecialtyIcon specialty={item} className={styles.itemIcon} />
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
