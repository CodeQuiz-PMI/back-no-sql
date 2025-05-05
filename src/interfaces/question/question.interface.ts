import { Document, Types } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  text: string;
  answer: string;
  response_1: string;
  response_2: string;
  response_3: string;
  response_4: string;
  correctResponse: string;
  type: string;
  order: number;
  points: number;
  createdAt: Date;
  section: Types.ObjectId;
}
