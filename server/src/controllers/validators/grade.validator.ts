import Joi from "joi";

export interface CreateGradeBody {
  grade: string;
  level: number;
}

export const createGradeBody = Joi.object<CreateGradeBody>({
  grade: Joi.string().required(),
  level: Joi.number().integer().required(),
});

export type UpdateGradeBody = Partial<CreateGradeBody>;

export const updateGradeBody = Joi.object<UpdateGradeBody>({
  grade: Joi.string(),
  level: Joi.number().integer(),
});
