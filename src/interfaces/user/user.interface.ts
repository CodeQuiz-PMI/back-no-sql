import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  currentLevel: string;
  currentSection: string;
  currentQuestion: string;
  trophies: number;
  lifes: number;
  hints: number;
  totalPoints: number;
  createdAt: Date;
  coins: number;
  ownedMusics: string[];
  ownedCursors: string[];
}
