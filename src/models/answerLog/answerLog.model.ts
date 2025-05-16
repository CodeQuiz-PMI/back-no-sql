import { model } from "mongoose";
import { IAnswerLog } from "../../interfaces";
import { AnswerLogSchema } from "../../schemas";

export const AnswerLog = model<IAnswerLog>("AnswerLog", AnswerLogSchema);
