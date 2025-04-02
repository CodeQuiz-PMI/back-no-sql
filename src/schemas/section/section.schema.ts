import { Schema } from "mongoose";
import { ISection } from "../../interfaces";

export const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  level: { type: Schema.Types.ObjectId, ref: "Level", required: true },
});
