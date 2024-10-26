import Medication from "@/models/medicationModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    hello: "world"
   });

 

  // return NextResponse.json({  });
}