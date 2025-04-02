import { Schema } from "mongoose";
import { IQuestion } from "../../interfaces";

export const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  answer: { type: String, required: true },
  response_1: { type: String, required: true },
  response_2: { type: String, required: true },
  response_3: { type: String, required: true },
  response_4: { type: String, required: true },
  correctResponse: { type: String, required: true },
  type: { type: String, required: true },
  points: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
});
