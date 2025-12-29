"use client";

import { useState } from "react";
import clsx from "clsx";
import { useForm, useFieldArray } from "react-hook-form";
import { TrashIcon, PlusCircleIcon, ChevronDoubleRightIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { sanitizeDiseaseData } from "@/app/libs/validation/sanitize";
import { VALID_SPECIALTIES } from "@/app/libs/validation/schemas";

export default function DiseaseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function addDisease(data) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Sanitize the data before sending
      const sanitizedData = sanitizeDiseaseData({
        disease: {
          name: data.name,
          specialty: data.specialty,
          definition: data.definition,
        },
        Rx: data.Rx.map(rx => ({
          mdc: rx.mdc?.trim(),
          dosage: rx.dosage?.trim(),
          quantity: rx.quantity?.trim(),
          instructions: rx.instructions?.trim(),
        })),
      });

      const response = await fetch("/api/disease/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Maladie ajoutée avec succès ✓");
        // Reset form
        reset();
        window.location.href = "/diseases";
      } else {
        setSubmitError(result.message || "Une erreur est survenue lors de l'ajout");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError("Impossible de communiquer avec le serveur. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
    mode: "onBlur", // Validate on blur for better UX
  });

  const { fields, append, remove } = useFieldArray({
    name: "Rx",
    control,
  });

  return (
    <>
      {submitError && (
        <div className="w-full lg:w-1/2 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
          <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Erreur</p>
            <p className="text-sm">{submitError}</p>
          </div>
        </div>
      )}

      <form
        className="w-full lg:w-1/2 flex flex-col gap-2"
        onSubmit={handleSubmit((data) => addDisease(data))}
        noValidate
      >
        {/* Disease Name */}
        <label htmlFor="name" className="text-xl font-semibold mt-2">
          Nom de la maladie <span className="text-red-500">*</span>
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Le nom de la maladie est requis",
              minLength: {
                value: 2,
                message: "Le nom doit contenir au moins 2 caractères",
              },
              maxLength: {
                value: 200,
                message: "Le nom ne peut pas dépasser 200 caractères",
              },
              validate: (value) => {
                const trimmed = value.trim();
                if (trimmed.length === 0) {
                  return "Le nom ne peut pas être vide";
                }
                return true;
              },
            })}
            placeholder="Ex: Diabète Type 2"
            aria-invalid={errors.name ? "true" : "false"}
            className={clsx(
              "search-box input w-full p-4 rounded-lg hover:placeholder:opacity-70 focus:placeholder:opacity-70",
              errors.name && "border-red-500"
            )}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {errors.name.message}
          </p>
        )}

        {/* Specialty */}
        <label htmlFor="specialty" className="text-xl font-semibold mt-4">
          Spécialité <span className="text-red-500">*</span>
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <select
            id="specialty"
            {...register("specialty", {
              required: "La spécialité est requise",
              validate: (value) => {
                if (!VALID_SPECIALTIES.includes(value)) {
                  return "Veuillez sélectionner une spécialité valide";
                }
                return true;
              },
            })}
            aria-invalid={errors.specialty ? "true" : "false"}
            className={clsx(
              "search-box input w-full p-4 rounded-lg",
              errors.specialty && "border-red-500"
            )}
          >
            <option value="">Sélectionnez une spécialité</option>
            {VALID_SPECIALTIES.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
        {errors.specialty && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {errors.specialty.message}
          </p>
        )}

        {/* Definition */}
        <label htmlFor="definition" className="text-xl font-semibold mt-4">
          Définition <span className="text-red-500">*</span>
        </label>
        <div className="relative search-container w-full flex flex-1 grow transition-all duration-300 ease-in-out hover:-translate-y-1">
          <textarea
            id="definition"
            {...register("definition", {
              required: "La définition est requise",
              minLength: {
                value: 10,
                message: "La définition doit contenir au moins 10 caractères",
              },
              maxLength: {
                value: 5000,
                message: "La définition ne peut pas dépasser 5000 caractères",
              },
            })}
            placeholder="Ex: Le diabète de type 2 est une maladie métabolique caractérisée par..."
            rows={4}
            aria-invalid={errors.definition ? "true" : "false"}
            className={clsx(
              "search-box input w-full p-4 rounded-lg hover:placeholder:opacity-70 focus:placeholder:opacity-70 resize-y",
              errors.definition && "border-red-500"
            )}
          />
        </div>
        {errors.definition && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <ExclamationCircleIcon className="w-4 h-4" />
            {errors.definition.message}
          </p>
        )}

        {/* Medications (Rx) */}
        <div className="border border-dotted flex-col flex-wrap gap-4 w-full p-4 rounded-lg mt-4">
          <label className="grow text-2xl font-bold mb-4">
            Ordonnance (Rx) <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={clsx(
                  "form-control grid grid-cols-1 lg:grid-cols-2 gap-4 border-b border-dotted p-4 rounded-md",
                  index === fields.length - 1 && "border-b-0"
                )}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor={`Rx.${index}.mdc`}>
                    Médicament #{index + 1} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`Rx.${index}.mdc`, {
                      required: "Le nom du médicament est requis",
                      minLength: {
                        value: 2,
                        message: "Le nom doit contenir au moins 2 caractères",
                      },
                      maxLength: {
                        value: 200,
                        message: "Le nom ne peut pas dépasser 200 caractères",
                      },
                    })}
                    placeholder="Ex: Metformine"
                    className={clsx(
                      "search-box input w-full p-4 rounded-lg",
                      errors.Rx?.[index]?.mdc && "border-red-500"
                    )}
                  />
                  {errors.Rx?.[index]?.mdc && (
                    <p className="text-red-500 text-sm">{errors.Rx[index].mdc.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`Rx.${index}.dosage`}>
                    Dosage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`Rx.${index}.dosage`, {
                      required: "Le dosage est requis",
                      maxLength: {
                        value: 100,
                        message: "Le dosage ne peut pas dépasser 100 caractères",
                      },
                    })}
                    placeholder="Ex: 500mg"
                    className={clsx(
                      "search-box input w-full p-4 rounded-lg",
                      errors.Rx?.[index]?.dosage && "border-red-500"
                    )}
                  />
                  {errors.Rx?.[index]?.dosage && (
                    <p className="text-red-500 text-sm">{errors.Rx[index].dosage.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`Rx.${index}.quantity`}>
                    Quantité <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`Rx.${index}.quantity`, {
                      required: "La quantité est requise",
                      maxLength: {
                        value: 100,
                        message: "La quantité ne peut pas dépasser 100 caractères",
                      },
                    })}
                    placeholder="Ex: QSP 3 mois"
                    className={clsx(
                      "search-box input w-full p-4 rounded-lg",
                      errors.Rx?.[index]?.quantity && "border-red-500"
                    )}
                  />
                  {errors.Rx?.[index]?.quantity && (
                    <p className="text-red-500 text-sm">{errors.Rx[index].quantity.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`Rx.${index}.instructions`}>Instructions</label>
                  <input
                    type="text"
                    {...register(`Rx.${index}.instructions`, {
                      maxLength: {
                        value: 500,
                        message: "Les instructions ne peuvent pas dépasser 500 caractères",
                      },
                    })}
                    placeholder="Ex: 2x par jour avec repas"
                    className="search-box input w-full p-4 rounded-lg"
                  />
                  {errors.Rx?.[index]?.instructions && (
                    <p className="text-red-500 text-sm">{errors.Rx[index].instructions.message}</p>
                  )}
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="lg:col-span-2 flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-700 p-4 rounded-lg self-center border-2 border-red-600 hover:border-red-700 active:bg-red-800 active:scale-95 transition-all duration-300"
                  >
                    <TrashIcon className="w-6 h-6" />
                    <span>Supprimer</span>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({
                  mdc: "",
                  dosage: "",
                  quantity: "",
                  instructions: "",
                })
              }
              className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-gray-600 text-white hover:bg-gray-700 p-4 rounded-lg self-center border-2 border-gray-600 hover:border-gray-700 active:bg-gray-800 active:scale-95 transition-all duration-300"
            >
              <PlusCircleIcon className="w-6 h-6" />
              Ajouter un médicament
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "search-container group relative my-2 p-4 min-h-16 rounded-lg text-white text-2xl font-bold transition-all ease-in-out duration-500",
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "active:scale-95 hover:-translate-y-1"
          )}
          style={{
            background: "linear-gradient(to right, var(--g1), var(--g2), var(--g3))",
          }}
        >
          <span className="text-2xl absolute inset-0 content-center group-hover:backdrop-blur-md">
            {isSubmitting ? "Ajout en cours..." : "Ajouter"}
            {!isSubmitting && (
              <ChevronDoubleRightIcon className="w-8 h-8 inline-block group-hover:translate-x-1 transition-all duration-300" />
            )}
          </span>
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          <span className="text-red-500">*</span> Champs obligatoires
        </p>
      </form>
    </>
  );
}
