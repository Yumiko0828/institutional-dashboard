import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator<unknown, ExecutionContext, string>(
  (data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req["userId"];
  },
);
