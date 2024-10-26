import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import fs from "fs";

async function readTxtFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function insertDataToDB(data) {
    const rows = data.split('\n').filter(row => row.trim() !== '');
    const insertQuery = `
        INSERT INTO medications2 (
            id, name, form, route, status,
            procedure_type, marketing_status, authorization_date,
            authorization_number, manufacturer, is_generic
        ) VALUES (
            $1, $2, $3, $4, $5, 
            $6, $7, $8, $9, $10, $11
        )
    `;
    for (const row of rows) {
        const fields = row.split('\t');
        if (fields.length === 11) {
            try {
                await sql.query(insertQuery, fields);
            } catch (err) {
                console.error('Error inserting data:', err);
            }
        } else {
            console.error('Invalid row format:', row);
        }
    }
}

export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const petName = searchParams.get("petName");
//   const ownerName = searchParams.get("ownerName");

  // try {
  //   if (!petName || !ownerName) throw new Error("Pet and owner names required");
  //   await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }

  // const pets = await sql`SELECT * FROM Pets;`;
  // return NextResponse.json({ pets: pets.rows }, { status: 200 });

  const filePath =
    "C:/Users/ADMIN/OneDrive/Bureau/Projects/Personal Projects/NextJS eOrdonnances/CIS_bdpm.txt";
  try {
    const data = await readTxtFile(filePath);
    await insertDataToDB(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
