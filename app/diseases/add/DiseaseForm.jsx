"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useForm, useFieldArray } from "react-hook-form";
import { TrashIcon, PlusCircleIcon, ChevronDoubleRightIcon, ExclamationCircleIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon as TrashIconSolid } from "@heroicons/react/24/solid";
import { sanitizeDiseaseData } from "@/app/libs/validation/sanitize";
import { VALID_SPECIALTIES } from "@/app/libs/validation/schemas";
import { getSpecialtyColorsWithShading } from "@/app/libs/specialties";
import DetailsBackground from "@/app/ui/details/DetailsBackground";

export default function DiseaseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const [submitError, setSubmitError] = useState(null);
  const scrollContainerRef = useRef(null);

  // Form setup
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
      specialty: "",
      definition: "",
      Rx: [{ mdc: "", dosage: "", quantity: "", instructions: "" }],
    },
    // Validation only on submit as requested
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  const { fields, append, remove } = useFieldArray({
    name: "Rx",
    control,
  });

  // Watch specialty to update theme colors dynamically
  const selectedSpecialty = watch("specialty");
  const { darker } = getSpecialtyColorsWithShading(selectedSpecialty || "Dermatologie"); // Default color

  async function addDisease(data) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true); // Trigger success state
        setTimeout(() => {
          window.location.href = "/diseases";
        }, 2000); // Wait 2s before redirect/reset
      } else {
        setSubmitError(result.message || "Une erreur est survenue lors de l'ajout");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError("Impossible de communiquer avec le serveur.");
    } finally {
      if (!isSuccess) setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Background Layer */}
      <DetailsBackground specialty={selectedSpecialty || "Dermatologie"} />

      <form
        onSubmit={handleSubmit(addDisease)}
        className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] lg:h-[calc(100vh)] w-full font-sans overflow-hidden"
        noValidate
      >
        {/* LEFT PANEL - Identity Fields */}
        <div className="w-full lg:w-[48%] p-6 lg:p-8 flex flex-col gap-6 lg:h-screen lg:overflow-y-auto scrollbar-none justify-start pt-10 lg:pt-16 items-start lg:pl-12">

          <div className="w-full max-w-[500px] flex flex-col gap-6">
            {/* Header Title (Small) */}
            <h1 className="text-white font-bold uppercase tracking-tight text-2xl mb-2">
              Ajouter une maladie
            </h1>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wide">Nom de la maladie <span className="text-red-300">*</span></label>
                {errors.name && <span className="text-red-300 text-xs font-bold uppercase tracking-wide animate-pulse">Requis</span>}
              </div>
              <input
                type="text"
                {...register("name", { required: true, minLength: 2 })}
                placeholder="Ex: Psoriasis"
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/60 focus:bg-white/20 outline-none transition-all font-bold text-lg text-white placeholder:text-white/30"
              />
            </div>

            {/* Specialty */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wide">Spécialité <span className="text-red-300">*</span></label>
                {errors.specialty && <span className="text-red-300 text-xs font-bold uppercase tracking-wide animate-pulse">Requise</span>}
              </div>
              <div className="relative">
                <select
                  {...register("specialty", { required: true })}
                  className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/60 focus:bg-white/20 outline-none transition-all font-medium text-base text-white cursor-pointer appearance-none"
                >
                  <option value="" className="text-gray-800">Sélectionnez...</option>
                  {VALID_SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec} className="text-gray-800">{spec}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/70">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            {/* Definition */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-bold text-white/90 uppercase tracking-wide">Définition <span className="text-red-300">*</span></label>
                {errors.definition && <span className="text-red-300 text-xs font-bold uppercase tracking-wide animate-pulse">Requise (min 10 car.)</span>}
              </div>
              <textarea
                {...register("definition", { required: true, minLength: 10 })}
                placeholder="Brève description de la pathologie..."
                rows={5}
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 focus:border-white/60 focus:bg-white/20 outline-none transition-all font-medium text-base text-white placeholder:text-white/30 resize-none leading-relaxed"
              />
            </div>
          </div>

        </div>

        {/* RIGHT PANEL - Rx Card */}
        <div className="w-full lg:w-[52%] p-6 lg:p-6 h-full flex flex-col justify-center items-center overflow-hidden">
          <div
            className="bg-white shadow-xl w-full max-w-2xl h-full max-h-full flex flex-col relative overflow-hidden text-gray-800"
            style={{ borderRadius: "1.5rem" }}
          >

            {/* Header - Fixed at top */}
            <div className="flex items-start justify-between p-8 pb-6 border-b border-dashed border-gray-300 shrink-0 bg-white z-10 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-2xl text-white transition-colors duration-300"
                  style={{ backgroundColor: darker }}
                >
                  <DocumentPlusIcon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    TRAITEMENT SUGGÉRÉ
                  </h3>
                  <h2
                    className="text-xl font-bold transition-colors duration-300"
                    style={{ color: darker }}
                  >
                    Ordonnance Type
                  </h2>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
            >
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm">
                  <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* SECTION: ORDONNANCE (Rx) */}
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative p-5 rounded-2xl bg-gray-50/50 border border-gray-100 group hover:border-gray-200 transition-colors"
                    >
                      {/* Remove Button */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 gap-4">
                        {/* Line 1: Med Name & Quantity */}
                        <div className="flex gap-4">
                          <div className="flex-grow flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Médicament</label>
                            <input
                              {...register(`Rx.${index}.mdc`, { required: "Requis" })}
                              placeholder="Nom du médicament"
                              className="w-full bg-transparent border-b border-gray-300 focus:border-[var(--brand-color)] outline-none py-1 font-bold text-gray-800 placeholder:text-gray-300 transition-colors"
                              style={{ '--brand-color': darker }}
                            />
                            {errors.Rx?.[index]?.mdc && <p className="text-red-500 text-[10px]">{errors.Rx[index].mdc.message}</p>}
                          </div>
                          <div className="w-1/3 flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Qté</label>
                            <input
                              {...register(`Rx.${index}.quantity`, { required: "Requis" })}
                              placeholder="Ex: 1 fl"
                              className="w-full bg-transparent border-b border-gray-300 focus:border-[var(--brand-color)] outline-none py-1 font-bold text-gray-800 placeholder:text-gray-300 text-right transition-colors"
                              style={{ '--brand-color': darker }}
                            />
                          </div>
                        </div>

                        {/* Line 2: Dosage */}
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">Dosage / Posologie</label>
                          <input
                            {...register(`Rx.${index}.dosage`, { required: "Requis" })}
                            placeholder="Ex: 1 application le soir"
                            className="w-full bg-transparent border-b border-gray-300 focus:border-[var(--brand-color)] outline-none py-1 text-sm font-medium text-gray-600 placeholder:text-gray-300 transition-colors"
                            style={{ '--brand-color': darker }}
                          />
                        </div>

                        {/* Line 3: Instructions */}
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-gray-500 uppercase">Instructions (Facultatif)</label>
                          <input
                            {...register(`Rx.${index}.instructions`)}
                            placeholder="Instructions spécifiques..."
                            className="w-full bg-transparent border-b border-gray-300 focus:border-[var(--brand-color)] outline-none py-1 text-sm font-normal text-gray-500 placeholder:text-gray-300 italic transition-colors"
                            style={{ '--brand-color': darker }}
                          />
                        </div>
                      </div>

                      {/* Number badge */}
                      <div className="absolute -left-3 top-6 bg-white border border-gray-100 text-gray-400 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                        {index + 1}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => append({ mdc: "", dosage: "", quantity: "", instructions: "" })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold text-sm hover:border-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  AJOUTER UN MÉDICAMENT
                </button>
              </div>
            </div>

            {/* Footer / Actions - Fixed at bottom */}
            <div className="p-8 pt-6 border-t border-dashed border-gray-300 flex justify-between items-center bg-white z-10 shrink-0">
              <div className="text-xs text-gray-400 font-medium">
                {fields.length} médicament(s)
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success-message"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-bold shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    <span>ENREGISTRÉ !</span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-full text-white font-bold shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: darker }}
                  >
                    {isSubmitting ? (
                      <span>Enregistrement...</span>
                    ) : (
                      <>
                        <span>ENREGISTRER</span>
                        <ChevronDoubleRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
