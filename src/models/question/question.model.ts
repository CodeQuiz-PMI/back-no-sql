import { model } from "mongoose";

import { IQuestion } from "../../interfaces";
import { QuestionSchema } from "../../schemas";

export const Question = model<IQuestion>('Question', QuestionSchema)