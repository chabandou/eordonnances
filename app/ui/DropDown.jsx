"use client";

import { useEffect } from "react";
import Arrow from "@/app/ui/icons/Arrow";

export default function DropDown({ items, pathname, searchParams, replace }) {
  useEffect(() => {
    var input = document.querySelector(".input-box");
    let arrow = document.querySelector(".arrow");
    let list = document.querySelector(".list");

    input.onclick = function () {
      this.classList.toggle("open");

      list.classList.toggle("open");
      arrow.classList.toggle("open");

    };

    var rad = document.querySelectorAll(".radio");
    rad.forEach((item) => {
      item.addEventListener("change", () => {
        input.innerHTML = item.nextElementSibling.innerHTML;
        input.classList.toggle("open");
        list.classList.remove("open");
        arrow.classList.remove("open");
        // input.click();
      });
    });

    var label = document.querySelectorAll("label");
    function search(searchin) {
      let searchVal = searchin.value;
      searchVal = searchVal.toUpperCase();
      label.forEach((item) => {
        let checkVal = item.querySelector(".name").innerHTML;
        checkVal = checkVal.toUpperCase();
        if (checkVal.indexOf(searchVal) == -1) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        let list = input.nextElementSibling;
        list.style.maxHeight = list.scrollHeight + "px";
      });
    }
  }, []);

  function handleFilter(specialty) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (specialty) {
      params.set("specialty", specialty);
    } else {
      params.delete("specialty");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="dropdown w-full lg:w-1/3">
      <div className="input-box"></div>
      <Arrow className="arrow" />

      <div className="list w-full lg:w-[300%] h-[75vh] lg:h-fit grid grid-cols-1 lg:grid-cols-3 ">
        <input onClick={() => handleFilter("")} key={"allInput"} type="radio" name="item" id="all" className="radio" />
        <label key={"allLabel"} htmlFor="all">
          <span className="name">Tous</span>
        </label>
        {items.map((item, i) => (
          <>
            <input
              onClick={() => handleFilter(item)}
              key={`${item}Input`}
              type="radio"
              name="item"
              id={item}
              className="radio"
            />
            <label key={`${item}Label`} htmlFor={item}>
              <span className="name">{item}</span>
            </label>
          </>
        ))}
      </div>
    </div>
  );
}
