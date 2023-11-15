import Joi from "joi";

export interface CreateStudentBody {
  firstName: string;
  lastName: string;
  section: string;
}

export const createStudentBody = Joi.object<CreateStudentBody>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  section: Joi.string().required(),
});

export type UpdateStudentBody = Partial<CreateStudentBody>;

export const updateStudentBody = Joi.object<UpdateStudentBody>({
  firstName: Joi.string(),
  lastName: Joi.string(),
  section: Joi.string(),
});
