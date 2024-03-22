"use client";

import CardsWithSpecialty from "@/app/ui/index/CardsWithSpecialty";
import CardsWithoutSpecialty from "@/app/ui/index/CardsWithoutSpecialty";

export default function DiseaseCards({ specialty, diseases }) {

        if (specialty) {
            return (
                <CardsWithSpecialty specialty={specialty} diseases={diseases} />
              )
        } else {
            return (
                <CardsWithoutSpecialty diseases={diseases} />
              )
        }
}