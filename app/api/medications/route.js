import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(NextRequest) {

  await connectToMongoDB();

  const Rxes = await Disease.aggregate([
    { $match: {} }, // filter by query
    { $project: { disease: 0, DDx: 0, Dx: 0, _id: 0, Rx: {_id: 0} } }, // remove disease, DDx and Dx fields
  ])
  return NextResponse.json({ Rxes });
}