import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";

const ITEMS_PER_PAGE = 40;
export async function GET(NextRequest) {
  const searchParams = NextRequest.nextUrl.searchParams;
  const currentPage = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q");
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  await connectToMongoDB();
  const query = q ? { "disease.name": { $regex: `${q}`, $options: "i" } } : null ;
  const diseases = await Disease.find(query).limit(ITEMS_PER_PAGE);
  console.log(diseases);
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
