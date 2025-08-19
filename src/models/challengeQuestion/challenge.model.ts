import { model } from "mongoose";

import { IChallenge } from "../../interfaces";
import { ChallengeSchema } from "../../schemas";

export const ChallengeQuestion = model<IChallenge>(
  "ChallengeQuestion",
  ChallengeSchema
);
