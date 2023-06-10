import type { Context, Next } from "koa";

const validate = (ctx: Context, next: Next) => {
  const { username } = ctx.query;
  if (!username) {
    ctx.status = 400;
    return (ctx.body = "Pass a username as a query parameter");
  }
  next();
};

export { validate };
