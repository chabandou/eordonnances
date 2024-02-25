import RxArray from "@/app/ui/details/RxArray";
import RxObject from "@/app/ui/details/RxObject";
export default async function diseasePage({ params }) {
  const id = params.id;
  async function getDisease(id) {
    const response = await fetch(`http://localhost:3000/api/disease/${id}`);
    const data = await response.json();
    return data;
  }
  const { foundDisease } = await getDisease(id);
  const { Rx, disease } = foundDisease;
  // console.log(foundDisease);

  return (
    <div className="flex flex-col ">
      <div>
        <h1 className="text-3xl">{disease.name}</h1>
        <h2 className="text-xl">
          {typeof disease.specialty === "string"
            ? disease.specialty
            : disease.specialty.map((s, index) =>
                index !== disease.specialty.length - 1 ? `${s}, ` : `${s}`
              )}
        </h2>
      </div>
      {Rx[0].name ? <RxArray Rx={Rx} /> : <RxObject Rx={Rx} />}
    </div>
  );
}
