import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    currentLevel: number;
    currentSection: number;
    currentQuestion: number;
    trophies: number;
    totalPoints: number;
    createdAt: Date;
}
