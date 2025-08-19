import { Schema } from "mongoose";
import { IUser } from "../../interfaces";

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  currentLevel: { type: String, required: false },
  currentSection: { type: String, required: false },
  currentQuestion: { type: String, required: false },
  trophies: { type: Number, required: false },
  lifes: { type: Number },
  hints: { type: Number },
  coins: { type: Number, default: 0 },
  totalPoints: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  ownedMusics: [{ type: String }],
  ownedCursors: [{ type: String, default: [] }],
  record: { type: Number },
});
