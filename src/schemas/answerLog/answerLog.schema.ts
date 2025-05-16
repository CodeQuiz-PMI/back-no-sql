import { Schema } from "mongoose";

export const AnswerLogSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  section: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  level: { type: Schema.Types.ObjectId, ref: "Level", required: true },
  
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  pointsEarned: { type: Number, default: 0 },
  
  answeredAt: { type: Date, default: Date.now },
});
