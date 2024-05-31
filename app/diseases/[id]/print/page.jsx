import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import PrintForm from "../../../ui/details/PrintForm";

export default async function Print({ params }) {
  const id = params.id;
  async function getDisease(id) {
    // const response = await fetch(`http://localhost:3000/api/disease/${id}`);
    await connectToMongoDB("get1Disease");
    const foundRx = await Disease.findById(id, "Rx");
    if (!foundRx) {
      return {
        notFound: true,
      };
    }
    return foundRx;
  }
  const Rx = (await getDisease(id)).Rx;
  console.log(Rx);

  return <PrintForm Rx={Rx} />;
}
