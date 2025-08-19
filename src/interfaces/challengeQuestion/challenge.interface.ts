import { Document } from "mongoose";

export interface IChallenge extends Document {
  answer: string;
  response_1: string;
  response_2: string;
  response_3: string;
  response_4: string;
  correctResponse: string;
  points: number;
  createdAt: Date;
}
