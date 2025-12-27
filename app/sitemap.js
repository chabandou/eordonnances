import { connectToMongoDB } from "@/app/libs/mongodb";
import Disease from "@/models/diseaseModel";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eordonnances.com';

  try {
    // Connect to database
    await connectToMongoDB("generateSitemap");

    // Get all disease IDs and update dates
    const diseases = await Disease.find({}, { _id: 1, updatedAt: 1 }).lean();

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/diseases`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/diseases/add`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ];

    // Dynamic disease pages
    const diseasePages = diseases.map((disease) => ({
      url: `${baseUrl}/diseases/${disease._id}`,
      lastModified: disease.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Specialty pages
    const specialties = await Disease.distinct("disease.specialty");
    const specialtyPages = specialties
      .filter(Boolean)
      .map((specialty) => ({
        url: `${baseUrl}/diseases?specialty=${encodeURIComponent(specialty)}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      }));

    return [...staticPages, ...diseasePages, ...specialtyPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return at least static pages if database fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/diseases`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];
  }
}
