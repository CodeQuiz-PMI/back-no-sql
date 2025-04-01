import { model } from "mongoose";

import { IUser } from "../../interfaces";
import { UserSchema } from "../../schemas";

export const User = model<IUser>('User', UserSchema)