import mongoose from "mongoose";

const Schema = mongoose.Schema;

const medicationSchema = new Schema({});


const Medication = mongoose.models?.Medication || mongoose.model("Medication", medicationSchema) ;

export default Medication;

    // any: Schema.Types.Mixed,
//   cis: String,
//   nom: String,
//   formePharmaceutique: String,
//   voiesAdmnistration: [String],
//   statusAutorisation: String,
//   typeAutorisation: String,
//   etatCommercialisation: String,
//   dateMiseSurLeMarche: String,
//   StatutBdm: String,
//   numeroAutorisationEuropeen: String,
//   titulaire: [String],
//   surveillanceRenforcee: Boolean,
//   presentation: [
//     {
//       cis: String,
//       cip: Number,
//       libelle: String,
//       statutAdministratif: String,
//       etatCommercialisation: String,
//       dateDeclaration: String,
//       CIP13: {
//         $numberLong: String
//       },
//       tagrementCollectivite: Boolean,
//       tauxRemboursement: [
//         String
//       ],
//       prix: Number,
//       indicationRemboursement: Number
//     },
//   ],
//   composition: [
//     {
//         cis: String,
//         elementPharmaceutique: String,
//         codeSubstance: Number,
//         denominationSubstance: String,
//         etatCommercialisation: String,
//         dosageSubstance: String,
//         referenceDosage: String,
//         LienSubtanceActivesEtFractionsTherapeutiques: String
//     }
//   ],
//   serviceMedicalRendu: Array,
//   generique: Array,
//   conditionsPrescription: Array,
  


// const diseaseSchema = new Schema({
//   disease: {
//     name: { type: String, required: true },
//     specialty: {
//       type: Schema.Types.Mixed,
//       required: true,
//     }
//   },
//   Rx: [
//     {
//       name: {
//         type: String,
        
//       },
//       dosage: {
//         type: String,
        
//       },
//       quantity: {
//         type: String,
        
//       },
//     },
//   ],
//   Dx: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Dx",
//     },
//   ],
//   DDx: {
//     type: Schema.Types.ObjectId,
//     ref: "DDx",
//   },
// });