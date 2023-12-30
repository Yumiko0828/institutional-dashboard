import { Section } from "@prisma/client";
import Joi from "joi";

export type RegisterSectionBody = Omit<Section, "id">;
export const registerSectionBody = Joi.object<RegisterSectionBody>({
  gradeId: Joi.string().required(),
  section: Joi.string().required(),
});

export type UpdateSectionBody = Partial<RegisterSectionBody>;
export const updateSectionBody = Joi.object<UpdateSectionBody>({
  gradeId: Joi.string(),
  section: Joi.string(),
});
