import { Schema } from "mongoose";
import { IUser } from "../../interfaces";

export const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    currentLevel: { type: Number, required: false },
    currentSection: { type: Number, required: false },
    currentQuestion: { type: Number, required: false },
    trophies: { type: Number, required: false },
    totalPoints: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
})