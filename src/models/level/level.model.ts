import { model } from "mongoose";

import { ILevel } from "../../interfaces";
import { LevelSchema } from "../../schemas";

export const Level = model<ILevel>('Level', LevelSchema)