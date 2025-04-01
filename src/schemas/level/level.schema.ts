import { Schema } from "mongoose";
import { ILevel } from "../../interfaces";

export const LevelSchema = new Schema<ILevel>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})