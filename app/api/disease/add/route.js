import { sendEmail } from "../../../libs/mail";
import { NextResponse } from "next/server";
import { validateData, createDiseaseSchema } from "@/app/libs/validation/schemas";
import { sanitizeDiseaseData } from "@/app/libs/validation/sanitize";
import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";

export async function POST(request) {
  try {
    // Parse request body
    const rawData = await request.json();

    // Sanitize input data
    const sanitizedData = sanitizeDiseaseData(rawData);

    // Validate against schema
    const validation = validateData(createDiseaseSchema, sanitizedData);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Données invalides",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Connect to database
    await connectToMongoDB("addDisease");

    // Check if disease already exists
    const existingDisease = await Disease.findOne({
      "disease.name": {
        $regex: new RegExp(`^${validatedData.disease.name}$`, "i"),
      },
    });

    if (existingDisease) {
      return NextResponse.json(
        {
          success: false,
          message: "Une maladie avec ce nom existe déjà",
        },
        { status: 409 }
      );
    }

    // Create new disease
    const newDisease = new Disease(validatedData);
    await newDisease.save();

    // Send email notification (optional - don't fail if email fails)
    try {
      await sendEmail({
        subject: "Nouvelle Ordonnance ajoutée",
        body: `
          Nouvelle ordonnance ajoutée avec succès.
          
          Maladie: ${validatedData.disease.name}
          Spécialité: ${validatedData.disease.specialty}
          Définition: ${validatedData.disease.definition}
          
          Médicaments (Rx):
          ${validatedData.Rx?.map((rx, index) => `
            ${index + 1}. ${rx.mdc}
               - Dosage: ${rx.dosage}
               - Quantité: ${rx.quantity}
               - Instructions: ${rx.instructions || "N/A"}
          `).join("\n") || "Aucun médicament"}
        `,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Maladie ajoutée avec succès",
        data: {
          id: newDisease._id,
          name: newDisease.disease.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding disease:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Une maladie avec ce nom existe déjà",
        },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur de validation des données",
          errors: Object.keys(error.errors).map((key) => ({
            field: key,
            message: error.errors[key].message,
          })),
        },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de l'ajout de la maladie",
      },
      { status: 500 }
    );
  }
}
