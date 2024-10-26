import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS medications2 (
        id BIGINT PRIMARY KEY,
        name TEXT,
        form TEXT,
        route TEXT,
        status TEXT,
        procedure_type TEXT,
        marketing_status TEXT,
        authorization_date DATE,
        authorization_number TEXT,
        manufacturer TEXT,
        is_generic BOOLEAN
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
