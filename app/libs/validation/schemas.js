import { z } from 'zod';

/**
 * Validation schemas for eOrdonnances
 * Using Zod for type-safe validation
 */

// Specialty validation - must be one of the defined specialties
const VALID_SPECIALTIES = [
  'Dermatologie',
  'Cardiologie',
  'Gastro-entérologie',
  'Urologie',
  'Neurologie',
  'Pneumologie',
  'Gynécologie',
  'Gynéco-Obstétrique',
  'ORL',
  'Oto-rhino-laryngologie',
  'Urgences',
];

// Base disease schema
export const diseaseSchema = z.object({
  disease: z.object({
    name: z
      .string()
      .min(2, 'Le nom de la maladie doit contenir au moins 2 caractères')
      .max(200, 'Le nom de la maladie ne peut pas dépasser 200 caractères')
      .trim()
      .refine((name) => name.length > 0, {
        message: 'Le nom de la maladie ne peut pas être vide',
      }),
    
    specialty: z
      .union([
        z.enum(VALID_SPECIALTIES),
        z.array(z.enum(VALID_SPECIALTIES)).min(1, 'Au moins une spécialité est requise'),
      ])
      .refine((val) => val !== null && val !== undefined, {
        message: 'La spécialité est requise',
      }),
    
    definition: z
      .string()
      .min(10, 'La définition doit contenir au moins 10 caractères')
      .max(5000, 'La définition ne peut pas dépasser 5000 caractères')
      .trim()
      .optional()
      .or(z.literal('')),
  }),
  
  Rx: z.any().optional(), // Flexible for now - can be string, array, or object
  Dx: z.array(z.string()).optional().default([]),
  DDx: z.string().optional().or(z.null()),
});

// Schema for creating a new disease (all fields required)
export const createDiseaseSchema = diseaseSchema.extend({
  disease: diseaseSchema.shape.disease.extend({
    definition: z
      .string()
      .min(10, 'La définition doit contenir au moins 10 caractères')
      .max(5000, 'La définition ne peut pas dépasser 5000 caractères')
      .trim(),
  }),
});

// Schema for updating a disease (all fields optional)
export const updateDiseaseSchema = z.object({
  disease: z.object({
    name: z
      .string()
      .min(2, 'Le nom de la maladie doit contenir au moins 2 caractères')
      .max(200, 'Le nom de la maladie ne peut pas dépasser 200 caractères')
      .trim()
      .optional(),
    
    specialty: z
      .union([
        z.enum(VALID_SPECIALTIES),
        z.array(z.enum(VALID_SPECIALTIES)).min(1),
      ])
      .optional(),
    
    definition: z
      .string()
      .min(10, 'La définition doit contenir au moins 10 caractères')
      .max(5000, 'La définition ne peut pas dépasser 5000 caractères')
      .trim()
      .optional(),
  }).optional(),
  
  Rx: z.any().optional(),
  Dx: z.array(z.string()).optional(),
  DDx: z.string().optional().or(z.null()),
});

// Search query schema
export const searchQuerySchema = z.object({
  q: z
    .string()
    .max(200, 'La recherche ne peut pas dépasser 200 caractères')
    .trim()
    .optional()
    .default(''),
  
  specialty: z
    .string()
    .max(100, 'La spécialité ne peut pas dépasser 100 caractères')
    .trim()
    .optional()
    .default(''),
  
  page: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseInt(val, 10) : val;
      return isNaN(num) ? 1 : num;
    })
    .pipe(z.number().int().positive().max(10000))
    .default(1),
});

// MongoDB ObjectId schema
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'ID invalide')
  .length(24, 'ID doit contenir 24 caractères');

// Delete disease schema
export const deleteDiseaseSchema = z.object({
  id: objectIdSchema,
});

// Medication schema (for future use)
export const medicationSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom du médicament doit contenir au moins 2 caractères')
    .max(200, 'Le nom du médicament ne peut pas dépasser 200 caractères')
    .trim(),
  
  dosage: z
    .string()
    .max(100, 'Le dosage ne peut pas dépasser 100 caractères')
    .optional(),
  
  frequency: z
    .string()
    .max(100, 'La fréquence ne peut pas dépasser 100 caractères')
    .optional(),
  
  duration: z
    .string()
    .max(100, 'La durée ne peut pas dépasser 100 caractères')
    .optional(),
});

/**
 * Validate data against a schema
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {Object} { success: boolean, data?: any, errors?: any }
 */
export function validateData(schema, data) {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Erreur de validation' }],
    };
  }
}

/**
 * Validate data asynchronously
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {Promise<Object>} { success: boolean, data?: any, errors?: any }
 */
export async function validateDataAsync(schema, data) {
  try {
    const validatedData = await schema.parseAsync(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Erreur de validation' }],
    };
  }
}

/**
 * Export list of valid specialties for use in components
 */
export { VALID_SPECIALTIES };
