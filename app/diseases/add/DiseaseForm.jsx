"use client";

import clsx from "clsx";
import { useForm, useFieldArray } from "react-hook-form";


import Rx from "@/app/ui/icons/Rx";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";


export default function DiseaseForm() {
  async function addDisease(data) {
    const { name, specialty, definition, Rx } = data;
    const newDisease = {
      name,
      specialty,
      definition,
      Rx,
    };
    const response = await fetch("http://localhost:3000/api/disease/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newDisease),
    });

    if (response.status === 201) {
      alert("Maladie ajoutée avec succès");
      window.location.href = "/diseases/add";
    } else {
      console.error(error);
      alert("Une erreur est survenue");
    }
  }
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      specialty: "",
      definition: "",
      Rx: [
        {
          mdc: "",
          dosage: "",
          quantity: "",
          instructions: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "Rx",
    control,
  });

  return (
    <>
      <form
        className="w-full lg:w-1/2 flex flex-col gap-2"
        onSubmit={handleSubmit((data) => addDisease(data))}
      >
        <label htmlFor="name" className="text-xl font-semibold mt-2">
          Nom de la maladie
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <input
            type="text"
            id="name"
            {...register("name", { required: true, minLength: 3 })}
            placeholder="E.g. Diabete"
            className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
          />
        </div>
        <label htmlFor="specialty" className="text-xl font-semibold mt-4">
          Spécialité
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <input
            type="text"
            id="specialty"
            {...register("specialty", { required: true })}
            placeholder="E.g. Endocrinologie"
            required
            className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
          />
        </div>
        <label htmlFor="definition" className="text-xl font-semibold mt-4">
          Définition
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <input
            type="text"
            id="definition"
            {...register("definition", { required: true, minLength: 15 })}
            placeholder="E.g. Une maladie métabolique..."
            required
            className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
          />
        </div>
        <div className=" border border-dotted flex-col flex-wrap gap-4 w-full p-4 rounded-lg mt-4">
          <label className="grow text-2xl font-bold mb-4">Rx</label>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={clsx(
                    "form-control grid grid-cols-1 lg:grid-cols-2 gap-4 border-b border-dotted p-4 rounded-md",
                    index === fields.length - 1 && "border-b-0"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mdc">Médicament #{index + 1}</label>
                    <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
                      <input
                        type="text"
                        id="mdc"
                        {...register(`Rx.${index}.mdc`)}
                        placeholder="E.g. Glucophage"
                        required
                        className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dosage">Dosage</label>
                    <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
                      <input
                        type="text"
                        id="dosage"
                        {...register(`Rx.${index}.dosage`)}
                        placeholder="E.g. 2 mg"
                        required
                        className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quantity">Quantité</label>
                    <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
                      <input
                        type="text"
                        id="quantity"
                        {...register(`Rx.${index}.quantity`)}
                        placeholder="E.g. QSP 3 mois"
                        required
                        className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="instructions">Instructions</label>
                    <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
                      <input
                        type="text"
                        id="instructions"
                        {...register(`Rx.${index}.instructions`)}
                        className="search-box input input-bordered input-primary w-full p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] focus:outline-[#ffffff9a] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                      className="lg:col-span-2 flex items-center justify-center bg-red-600 text-white hover:bg-red-700 p-4 rounded-lg self-center border-2 border-red-600 hover:border-red-700 active:bg-red-800 active:scale-95 transition-all duration-300"
                    >
                     
                      <TrashIcon className="w-6 h-6 transition-all duration-300" />
                      <span className="sr-only">Supprimer le médicament</span>
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                append({
                  mdc: "",
                  dosage: "",
                  quantity: "",
                  instructions: "",
                });
              }}
              className="w-full md:w-1/2 lg:h-1/3 flex group items-center bg-gray-600 text-white hover:bg-gray-700 p-4 rounded-lg self-center border-2 border-gray-600 hover:border-gray-700 active:bg-gray-800 active:scale-95 transition-all duration-300"
            >
              <PlusCircleIcon className="w-6 h-6 -translate-x-[0.15rem] mr-2 transition-all duration-300" />
              Médicament
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="search-container group relative my-2 p-4 min-h-16 rounded-lg text-white text-2xl font-bold active:scale-95 hover:-translate-y-1 transition-all ease-in-out duration-500"
          style={{
            background: 'linear-gradient(to right, var(--g1), var(--g2), var(--g3))'
           }}
        >
          <span className="text-2xl absolute inset-0 content-center group-hover:backdrop-blur-md">Ajouter <ChevronDoubleRightIcon className="w-8 h-8 inline-block group-hover:translate-x-1 transition-all duration-300" /></span>
          <span className="sr-only">Ajouter la maladie</span>
        </button>
      </form>
    </>
  );
}
