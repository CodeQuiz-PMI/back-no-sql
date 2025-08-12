import { Schema } from "mongoose";
import { IQuestion } from "../../interfaces";

export const QuestionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  answer: { type: String, required: true },
  response_1: { type: String, required: false },
  response_2: { type: String, required: false },
  response_3: { type: String, required: false },
  response_4: { type: String, required: false },
  correctResponse: { type: String, required: true },
  type: { type: String, required: true },
  order: { type: Number, required: true },
  points: { type: Number, required: true },
  coinsValues: { type: Number, require: true },
  hints: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
});
