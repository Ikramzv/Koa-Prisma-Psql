import type { Context, Next } from "koa";
import { getUserByEmailOrName } from "../controllers/users";

const validate = async (ctx: Context, next: Next) => {
  const { username } = ctx.query;
  if (!username) {
    ctx.status = 400;
    return (ctx.body = "Pass a username as a query parameter");
  }

  const user = await getUserByEmailOrName(ctx, username as string);

  if (!user) {
    ctx.status = 400;
    return (ctx.body = `There is no user whose username is ${username} in database`);
  }

  ctx.state.user = user;
  await next();
};

export { validate };
