import { model } from "mongoose";

import { ISection } from "../../interfaces";
import { SectionSchema } from "../../schemas";

export const Section = model<ISection>('Section', SectionSchema)