import { Document } from "mongoose";

export interface ILevel extends Document {
    title: string;
    description: string;
    difficulty: string;
    createdAt: Date;
}