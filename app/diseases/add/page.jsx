
import DiseaseForm from "./DiseaseForm";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";

export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 60
export const dynamic = 'force-static';



export default function Add() {
   
    
    return (
        <section className="flex flex-col w-full justify-center items-center gap-10 mt-4 z-[5] p-4">
            <h1 className="text-2xl lg:text-3xl text-center font-bold uppercase">Ajoutez Une Ordonnance <DocumentPlusIcon className="w-16 h-16 lg:w-12 lg:h-12 inline-block mt-2 lg:mt-0" /></h1>
            <DiseaseForm />
        </section>
    );
}