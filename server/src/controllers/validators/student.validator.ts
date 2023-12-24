import Joi from "joi";

export interface CreateStudentBody {
  firstName: string;
  lastName: string;
  sectionId: string;
}

export const createStudentBody = Joi.object<CreateStudentBody>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  sectionId: Joi.string().required(),
});

export type UpdateStudentBody = Partial<CreateStudentBody>;

export const updateStudentBody = Joi.object<UpdateStudentBody>({
  firstName: Joi.string(),
  lastName: Joi.string(),
  sectionId: Joi.string(),
});
