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
    <section className="flex flex-col w-full justify-center items-center gap-8 my-4 z-[5] px-4 md:px-0">
      <div
        className={`detail-card p-6 md:p-8  m-1 w-full md:w-3/4 flex flex-col md:flex-row justify-center items-start gap-4 disease-card-${disease.specialty}`}
      >
        <div className="w-full md:w-fit md:max-w-[50%] flex flex-row md:flex-col justify-between gap-4 z-[5]">
          <h1 className="text-2xl md:text-3xl self-start font-bold uppercase ">
            {disease.name}
          </h1>
          <h2 className={`text-xl self-start md:self-start md:text-xl font-semibold text-color-specialty disease-card-${disease.specialty}`}>
            {typeof disease.specialty === "string"
              ? disease.specialty
              : disease.specialty.map((s, index) =>
                  index !== disease.specialty.length - 1 ? `${s}, ` : `${s}`
                )}
          </h2>
        </div>
        <div className="disease-def flex flex-col md:flex-row w-full md:gap-4">
          <div className="divider"></div>
          <p className=" text-justify">
            {disease.definition
              ? disease.definition
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque scelerisque dapibus. Integer a ultricies turpis. Etiam ut dignissim metus. Pellentesque nisl orci, lacinia lacinia gravida blandit, interdum et augue. Etiam maximus vel nulla quis consequat. Aliquam semper cursus erat quis venenatis. Vestibulum consectetur tortor non quam sagittis facilisis."}
          </p>
        </div>
      </div>
      <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div
          id="Rx"
          className="detail-card Rx-card col-span-1 md:col-span-2 w-full min-h-[500px] md:min-h-[700px] h-fit flex justify-center items-center relative"
        >
          {/* <Image
            src="/rx-illustration.svg"
            alt="rx-illustration"
            fill
            className="w-full h-full object-contain"
            /> */}
          <Image
            src="/pill-bottle.svg"
            alt="waveT"
            width={100}
            height={100}
            className="w-1/6 absolute top-0 left-0  -translate-y-1/4 -translate-x-1/4 z-40"
          />
          <Image
            src="/pills.svg"
            alt="waveT"
            width={100}
            height={100}
            className="w-1/5 absolute bottom-0 right-0 translate-x-1/4 z-40"
          />
          <div className="w-[calc(100%-20px)] min-h-[calc(100%-20px)] my-5 md:my-10 flex justify-center items-start flex-col gap-4 relative overflow-hidden rounded-[8.5%]">
            <Image
              src="/waveT.svg"
              alt="waveT"
              width={100}
              height={100}
              className="absolute top-[-5px] left-[-2px] w-2/3"
            />
            <Image
              src="/waveB.svg"
              alt="waveB"
              width={100}
              height={100}
              className="absolute bottom-[-8%] right-[-2%] w-full"
            />
            <Image
              src="/Union.svg"
              alt="waveT"
              width={100}
              height={100}
              className="absolute top-1/2 left-1/2 w-2/3 -translate-x-1/2 -translate-y-1/2"
            />
            <RxCard Rx={Rx}>
              {Array.isArray(Rx) ? <RxArray Rx={Rx} /> : <RxObject Rx={Rx} />}
            </RxCard>
          </div>
        </div>
        <div className="detail-card p-6 md:p-8 w-full m-0 flex justify-between items-start flex-col gap-4">
          <h1 className="text-2xl font-bold">Dx</h1>
          <p className="h-full">Diagnosis</p>
        </div>
      </div>
    </section>
  );
}
