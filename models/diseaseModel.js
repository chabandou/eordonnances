import mongoose from "mongoose";

const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
  disease: {
    name: { type: String, required: true },
    specialty: {
      type: Schema.Types.Mixed,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
  },
  Rx: Schema.Types.Mixed,
  Dx: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dx",
    },
  ],
  DDx: {
    type: Schema.Types.ObjectId,
    ref: "DDx",
  },
});

const Disease = mongoose.models.Disease || mongoose.model("Disease", diseaseSchema) ;

export default Disease;



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