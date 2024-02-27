import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToMongoDB();
  const diseasesCount = await Disease.countDocuments({});
  return NextResponse.json({ diseasesCount });
}
