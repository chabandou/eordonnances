
import DiseaseForm from "./DiseaseForm";
export default function Add() {
   
    
    return (
        <section className="flex flex-col w-full justify-center items-center gap-4 mt-4 z-[5]">
            <h1>Ajoutez Une Ordonnance</h1>
            <DiseaseForm />
        </section>
    );
}