import Router from "@koa/router";
import postsRouter from "./posts";
import usersRouter from "./users";

const router = new Router();

router.use(usersRouter.routes()).use(usersRouter.allowedMethods());
router.use(postsRouter.routes()).use(postsRouter.allowedMethods());

export default router;
