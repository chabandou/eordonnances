import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { log } from "console";

const ITEMS_PER_PAGE = 25;
export async function GET(NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams;
  const currentPage = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q");
  const specialty = searchParams.get("specialty");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  await connectToMongoDB();

  const query = q
    ? specialty
      ? {
          "disease.name": { $regex: `${q}`, $options: "i" },
          "disease.specialty": { $regex: `${specialty}`, $options: "i" },
        }
      : { "disease.name": { $regex: `${q}`, $options: "i" } }
    : specialty
    ? { "disease.specialty": { $regex: `${specialty}`, $options: "i" } }
    : {};

  // const query = q ? { "disease.name": { $regex: `${q}`, $options: "i" } } : {};
  console.log("the query is:", query);
  const diseases = await Disease.aggregate([
    { $match: query }, // filter by query
    { $project: { Rx: 0, DDx: 0, Dx: 0 } }, // remove Rx, DDx and Dx fields
  ])
    .limit(ITEMS_PER_PAGE) // limit to 25 documents retrieved
    .skip(offset); // skip the first 25 items
  return NextResponse.json({ diseases });
}

// this worked once for sure
export async function POST(request) {
  const data = await request.json();
  console.log(request);
  await connectToMongoDB();
  await Disease.create(data);
  return NextResponse.json({ message: "disease created" }, { status: 201 });
}

//
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToMongoDB();
  await Disease.findByIdAndDelete(id);
  return NextResponse.json({ message: "disease deleted" }, { status: 200 });
}
