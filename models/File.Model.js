import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true,
      index: true
    },
    file: {
      s3Key: {
        type: String,
        required: true
      },
      format: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

export const File = mongoose.models.File || mongoose.model("File", fileSchema);
