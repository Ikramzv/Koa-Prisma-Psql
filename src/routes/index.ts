import Router from "@koa/router";
import usersRouter from "./users";

const router = new Router();

router.use(usersRouter.routes()).use(usersRouter.allowedMethods());

export default router;
