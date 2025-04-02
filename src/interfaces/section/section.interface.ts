import { Document, Types } from "mongoose";

export interface ISection extends Document {
  title: string;
  description: string;
  createdAt: Date;
  level: Types.ObjectId;
}
