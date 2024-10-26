
import DiseaseForm from "./DiseaseForm";
export default function Add() {
   
    
    return (
        <section className="flex flex-col w-full justify-center items-center gap-10 mt-4 z-[5] p-4">
            <h1 className="text-2xl font-bold">Ajoutez Une Ordonnance</h1>
            <DiseaseForm />
        </section>
    );
}