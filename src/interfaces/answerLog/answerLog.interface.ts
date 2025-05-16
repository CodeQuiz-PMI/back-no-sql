import { Types } from "mongoose";

export interface IAnswerLog {
  user: Types.ObjectId;
  question: Types.ObjectId;
  section: Types.ObjectId;
  level: Types.ObjectId;

  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;

  answeredAt: Date;
}
