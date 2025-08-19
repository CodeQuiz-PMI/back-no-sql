import { Schema } from "mongoose";
import { IChallenge } from "../../interfaces";

export const ChallengeSchema = new Schema<IChallenge>({
  answer: { type: String, required: true },
  response_1: { type: String, required: false },
  response_2: { type: String, required: false },
  response_3: { type: String, required: false },
  response_4: { type: String, required: false },
  correctResponse: { type: String, required: true },
  points: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
