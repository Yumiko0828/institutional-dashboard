import { Levels } from "@prisma/client";
import Joi from "joi";

export interface CreateGradeBody {
  discriminator: number;
  level: Levels;
}

export const createGradeBody = Joi.object<CreateGradeBody>({
  discriminator: Joi.number().integer().required(),
  level: Joi.string().required(),
});

export type UpdateGradeBody = Partial<CreateGradeBody>;

export const updateGradeBody = Joi.object<UpdateGradeBody>({
  discriminator: Joi.number().integer(),
  level: Joi.string(),
});
