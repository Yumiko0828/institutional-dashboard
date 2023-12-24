import Joi from "joi";

export interface SigninBody {
  email: string;
  password: string;
}

export const signinBody = Joi.object<SigninBody>({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export interface RefreshBody {
  refreshToken: string;
}

export const refreshBody = Joi.object<RefreshBody>({
  refreshToken: Joi.string().required(),
});
