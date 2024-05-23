import { sendEmail } from "../../../libs/mail";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  const data = await request.json();
  try {
    await sendEmail({
      subject: "Nouvelle Ordonnance",
      body: `Vous avez une nouvelle ordonnance. Nom de la maladie: ${
        data.name
      }. Spécialité: ${data.specialty}. Définition: ${
        data.definition
      }. Rx: ${data.Rx.map((rx) => {
        return `medicament: ${rx.mdc} - dosage: ${rx.dosage} - quantity: ${rx.quantity} - instructions: ${rx.instructions}`;
      })}.`,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
