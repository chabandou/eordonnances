"use client";

import { useForm } from "react-hook-form";

export default function PrintForm({ Rx }) {
    const currentDate = new Date().toDateString();
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm({
      defaultValues: {
        date: currentDate,
      },
    });
    const date = watch("date");
    const name = watch("name");
    const age = watch("age");
    const sex = watch("sex");
    return (
        <section className="print-sec grid grid-cols-2 place-items-center h-fit">
        <div id="prescription" className="prescription">
          <p className="p-date font-bold text-black capitalize">{date}</p>
          <p className="p-name font-bold text-black text-xl capitalize">{name}</p>
          <p className="p-age font-bold text-black capitalize">{age}</p>
          <p className="p-sex font-bold text-black capitalize">{sex}</p>
          {Rx}
          
        </div>
        <div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <input
              type="text"
              placeholder="Date"
              {...register("date", { required: "Ce champ est requis" })}
            />
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
            <input
              type="text"
              placeholder="Nom du patient"
              {...register("name", { required: "Ce champ est requis" })}
            />
            <p className=" text-red-500 text-sm">{errors.name?.message}</p>
            <input
              type="text"
              placeholder="Age"
              {...register("age", { required: "Ce champ est requis" })}
            />
            <p className=" text-red-500 text-sm">{errors.age?.message}</p>
            <input
              type="text"
              placeholder="Sexe"
              {...register("sex", { required: "Ce champ est requis" })}
            />
            <p className=" text-red-500 text-sm">{errors.sex?.message}</p>
            <button>Imprimer</button>
          </form>
        </div>
      </section>
    );
}