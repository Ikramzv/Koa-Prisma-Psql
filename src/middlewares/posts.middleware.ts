import type { Context } from "koa";

const setUser = (ctx: Context) => {
  const { username } = ctx.query;
};

export { setUser };
