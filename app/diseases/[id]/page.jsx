import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import Medication from "../../../models/medicationModel";
import Link from "next/link";
import RxCard from "@/app/ui/details/RxCard";
import RxArray from "@/app/ui/details/RxArray";
import RxObject from "@/app/ui/details/RxObject";
import Image from "next/image";

export default async function diseasePage({ params }) {
  const id = params.id;
  async function getDisease(id) {
    // const response = await fetch(`http://localhost:3000/api/disease/${id}`);
    await connectToMongoDB("get1Disease");
    const foundDisease = await Disease.findById(id);
    if (!foundDisease) {
      return {
        notFound: true,
      };
    }
    return foundDisease;
  }

  const { Rx, disease } = await getDisease(id);

  return (
    <section className="flex flex-col w-full justify-center items-center gap-4 mt-4 z-[5]">
      <div
        className={`detail-card m-1 w-3/4 flex justify-center items-start flex-row gap-4 disease-card-${disease.specialty}`}
      >
        <div className="w-fit max-w-[50%] flex flex-col gap-4 z-[5]">
          <h1 className="text-3xl font-bold uppercase ">{disease.name}</h1>
          <h2 className="text-xl ">
            {typeof disease.specialty === "string"
              ? disease.specialty
              : disease.specialty.map((s, index) =>
                  index !== disease.specialty.length - 1 ? `${s}, ` : `${s}`
                )}
          </h2>
        </div>
        <div className="disease-def flex w-full gap-4">
          <div className="divider"></div>
          <p>
            {disease.definition
              ? disease.definition
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque scelerisque dapibus. Integer a ultricies turpis. Etiam ut dignissim metus. Pellentesque nisl orci, lacinia lacinia gravida blandit, interdum et augue. Etiam maximus vel nulla quis consequat. Aliquam semper cursus erat quis venenatis. Vestibulum consectetur tortor non quam sagittis facilisis."}
          </p>
        </div>
      </div>
      <div className="w-3/4 grid grid-cols-3 gap-4">
        <div
          id="Rx"
          style={{ backgroundColor: "transparent" }}
          className="detail-card col-span-2 w-full aspect-[1/1.15] m-0 flex justify-center items-start flex-col gap-4"
        >
          <Image
            src="/rx-illustration.svg"
            alt="rx-illustration"
            fill
            className="w-full h-full object-contain"
          />
          <RxCard Rx={Rx}>
            {Array.isArray(Rx) ? <RxArray Rx={Rx} /> : <RxObject Rx={Rx} />}
          </RxCard>
        </div>
        <div className="detail-card w-full m-0 flex justify-between items-start flex-col gap-4">
          <h1 className="text-2xl font-bold">Dx</h1>
          <p className="h-full">Diagnosis</p>
        </div>
      </div>
    </section>
  );
}
