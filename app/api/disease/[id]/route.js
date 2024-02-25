import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectToMongoDB();
  const foundDisease = await Disease.findById(id);
  if (!foundDisease) {
    return NextResponse.json({ message: "disease details not found" });
  }
  return NextResponse.json({ foundDisease }, { status: 200 });

}

// export async function PUT(request, { params }) {
//   const { id } = params;
//   const data = await request.json();
//   await connectToMongoDB();
//   const foundDisease = await Disease.findByIdAndUpdate(id, data);
//   if (!foundDisease) {
//     return NextResponse.json({ message: "disease details not found" });
//   }
//   return NextResponse.json({ message:"Rx updated" }, { status: 200 });
// }

