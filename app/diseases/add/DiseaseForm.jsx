"use client";

import { useForm, useFieldArray } from "react-hook-form";

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
        className="flex flex-col gap-4 w-1/2"
        onSubmit={handleSubmit((data) => addDisease(data))}
      >
        <label htmlFor="name">Nom de la maladie</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          placeholder="E.g. Diabete"
        />
        <label htmlFor="specialty">Spécialité</label>
        <input
          type="text"
          id="specialty"
          {...register("specialty", { required: true })}
          placeholder="E.g. Endocrinologie"
          required
        />
        <label htmlFor="definition">Définition</label>
        <input
          type="text"
          id="definition"
          {...register("definition", { required: true, minLength: 15 })}
          placeholder="E.g. Une maladie..."
          required
        />
        <div className=" border border-dotted flex flex-wrap gap-4 w-full">
          <label className="grow">Rx</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="form-control">
                  <label htmlFor="mdc">Médicament</label>
                  <input
                    type="text"
                    id="mdc"
                    {...register(`Rx.${index}.mdc`)}
                    placeholder="E.g. Glucophage"
                    required
                  />
                  <label htmlFor="dosage">Dosage</label>
                  <input
                    type="text"
                    id="dosage"
                    {...register(`Rx.${index}.dosage`)}
                    placeholder="E.g. 2 mg"
                    required
                  />
                  <label htmlFor="quantity">Quantité</label>
                  <input
                    type="text"
                    id="quantity"
                    {...register(`Rx.${index}.quantity`)}
                    placeholder="E.g. QSP 3 mois"
                    required
                  />
                  <label htmlFor="instructions">Instructions</label>
                  <input
                    type="text"
                    id="instructions"
                    {...register(`Rx.${index}.instructions`)}
                  ></input>

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
            >
              + Médicament
            </button>
          </div>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}
