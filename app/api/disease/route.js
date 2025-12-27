import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import { validateData, searchQuerySchema, deleteDiseaseSchema } from "@/app/libs/validation/schemas";
import { sanitizeSearchQuery } from "@/app/libs/validation/sanitize";
import { isValidObjectId } from "@/app/libs/errors/errorHandler";

const ITEMS_PER_PAGE = 25;

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract and validate search parameters
    const rawParams = {
      page: searchParams.get("page"),
      q: searchParams.get("q"),
      specialty: searchParams.get("specialty"),
    };

    const validation = validateData(searchQuerySchema, rawParams);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Paramètres de recherche invalides",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { page: currentPage, q, specialty } = validation.data;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    await connectToMongoDB("getDiseases");

    // Sanitize search inputs
    const sanitizedQ = sanitizeSearchQuery(q);
    const sanitizedSpecialty = sanitizeSearchQuery(specialty);

    // Build query
    const query = {};
    if (sanitizedQ) {
      query["disease.name"] = { $regex: sanitizedQ, $options: "i" };
    }
    if (sanitizedSpecialty) {
      query["disease.specialty"] = { $regex: sanitizedSpecialty, $options: "i" };
    }

    // Execute query
    const diseases = await Disease.aggregate([
      { $match: query },
      { $project: { Rx: 0, DDx: 0, Dx: 0 } },
    ])
      .limit(ITEMS_PER_PAGE)
      .skip(offset);

    return NextResponse.json({
      success: true,
      diseases,
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.error("GET /api/disease error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des maladies",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    // Validate ObjectId
    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "ID de maladie invalide",
        },
        { status: 400 }
      );
    }

    // Validate with schema
    const validation = validateData(deleteDiseaseSchema, { id });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Paramètres invalides",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    await connectToMongoDB("deleteDisease");

    // Check if disease exists
    const disease = await Disease.findById(id);

    if (!disease) {
      return NextResponse.json(
        {
          success: false,
          message: "Maladie introuvable",
        },
        { status: 404 }
      );
    }

    // Delete disease
    await Disease.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Maladie supprimée avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/disease error:", error);

    if (error.name === "CastError") {
      return NextResponse.json(
        {
          success: false,
          message: "ID de maladie invalide",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la suppression de la maladie",
      },
      { status: 500 }
    );
  }
}
