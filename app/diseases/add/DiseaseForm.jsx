"use client";

import clsx from "clsx";
import { useForm, useFieldArray } from "react-hook-form";
import Rx from "@/app/ui/icons/Rx";


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
        className="flex flex-col gap-2 w-1/2"
        onSubmit={handleSubmit((data) => addDisease(data))}
      >
        <label htmlFor="name" className="text-xl font-semibold">Nom de la maladie</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          placeholder="E.g. Diabete"
          className="input input-bordered input-primary w-full p-4 mb-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
        />
        <label htmlFor="specialty" className="text-xl font-semibold">Spécialité</label>
        <input
          type="text"
          id="specialty"
          {...register("specialty", { required: true })}
          placeholder="E.g. Endocrinologie"
          required
          className="input input-bordered input-primary w-full p-4 mb-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
        />
        <label htmlFor="definition" className="text-xl font-semibold">Définition</label>
        <input
          type="text"
          id="definition"
          {...register("definition", { required: true, minLength: 15 })}
          placeholder="E.g. Une maladie..."
          required
          className="input input-bordered input-primary w-full p-4 mb-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
        />
        <div className=" border border-dotted flex-col flex-wrap gap-4 w-full p-4 rounded-lg">
          <label className="grow text-2xl font-bold mb-4">Rx</label>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className={clsx(
                    "form-control grid grid-cols-2 gap-4 border-b border-dotted p-4 rounded-md",
                    index === fields.length - 1 && "border-b-0"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mdc">Médicament #{index + 1}</label>
                    <input
                      type="text"
                      id="mdc"
                      {...register(`Rx.${index}.mdc`)}
                      placeholder="E.g. Glucophage"
                      required
                      className="input input-bordered input-primary w-full max-w-xs p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dosage">Dosage</label>
                    <input
                      type="text"
                      id="dosage"
                      {...register(`Rx.${index}.dosage`)}
                      placeholder="E.g. 2 mg"
                      required
                      className="input input-bordered input-primary w-full max-w-xs p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quantity">Quantité</label>
                    <input
                      type="text"
                      id="quantity"
                      {...register(`Rx.${index}.quantity`)}
                      placeholder="E.g. QSP 3 mois"
                      required
                      className="input input-bordered input-primary w-full max-w-xs p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="instructions">Instructions</label>
                    <input
                      type="text"
                      id="instructions"
                      {...register(`Rx.${index}.instructions`)}
                      className="input input-bordered input-primary w-full max-w-xs p-4 rounded-lg outline outline-[0.5mm] outline-[#ffffff26] hover:placeholder:opacity-70 focus:placeholder:opacity-70"
                    ></input>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Supprimer
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
              className="flex group items-center hover:bg-gray-500/50 text-gray-300 hover:text-white p-4 rounded-lg self-center border-2 border-gray-400/80 hover:border-transparent active:bg-[#008148] active:scale-95 transition-all duration-300"
            >
              + {<Rx className="w-6 h-6 -translate-x-[0.15rem] *:fill-gray-300 group-hover:*:fill-white transition-all duration-300" />} Médicament
            </button>
          </div>
        </div>
        <button type="submit" className="my-2 p-4 rounded-lg bg-gray-500/60 text-white hover:bg-[#008148] active:bg-[hsl(153,100%,15%)] active:scale-95 transition-all duration-300">Ajouter</button>
      </form>
    </>
  );
}
