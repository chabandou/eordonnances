"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import stetho from "@/public/stetho.svg"
import clsx from "clsx";
import Stetho from "@/app/ui/index/Stetho";

export default function DiseaseCard({ d }) {
  const diseaseCardRef = useRef();
  

  return (
    <Link
      key={d._id}
      href={`/diseases/${d._id}`}
      className="hover:cursor-pointer border-transparent rounded-3xl text-xl sm:w-full lg:w-1/3 m-4 "
    >
      <div ref={diseaseCardRef} className={`disease-card disease-card-${d.disease.specialty}`}>
        <div
          className=" *:z-10 z-[5] flex flex-col rounded-3xl p-4 gap-3 disease-card-content"
          key={d._id}
        >
          <h2 className="font-bold text-teal-300 text-2xl transition ease-out duration-250">
            {d.disease.name}
          </h2>
          <h3 className="text-white text-opacity-80 uppercase text-base tracking-wide">
            {typeof d.disease.specialty === "string"
              ? d.disease.specialty
              : d.disease.specialty.join(", ")}
          </h3>

          <Stetho className="icon"/>
          </div>
        </div>
    </Link>
  );
}
