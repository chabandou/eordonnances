import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { log } from "console";

export async function GET(NextRequest) {
  await connectToMongoDB();
  const specialties = await Disease.aggregate([
    { $match: {} }, // filter by query
    { $project: { Rx: 0, DDx: 0, Dx: 0, _id: 0, "disease.name": 0 } }, // remove Rx, DDx and Dx fields
  ])
  return NextResponse.json({ specialties });
}