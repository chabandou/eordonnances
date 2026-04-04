"use server";

import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";
import { sanitizeSearchQuery } from "@/app/libs/validation/sanitize";

const ITEMS_PER_PAGE = 20;

export async function getDiseasesWithCountAction(q, currentPage, specialty) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    
    // Sanitize search inputs to prevent injection
    const sanitizedQ = sanitizeSearchQuery(q);
    const sanitizedSpecialty = sanitizeSearchQuery(specialty);
    
    // Build query once
    const matchQuery = {};
    if (sanitizedQ) matchQuery["disease.name"] = { $regex: sanitizedQ, $options: "i" };
    if (sanitizedSpecialty) matchQuery["disease.specialty"] = { $regex: sanitizedSpecialty, $options: "i" };

    await connectToMongoDB("getDiseasesAction");
    
    // Single aggregation pipeline with facet for count and data
    const result = await Disease.aggregate([
      { $match: matchQuery },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $project: { Rx: 0, DDx: 0, Dx: 0 } },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE }
          ]
        }
      }
    ]);

    const total = result[0]?.metadata[0]?.total || 0;
    const diseases = result[0]?.data || [];

    // Convert to plain JavaScript objects
    return { 
      diseases: JSON.parse(JSON.stringify(diseases)), 
      count: total,
      hasMore: offset + diseases.length < total
    };
  } catch (error) {
    console.error('Error fetching diseases in action:', error);
    throw new Error('Erreur lors de la récupération des maladies.');
  }
}
