import Router from "@koa/router";
import { User } from "@prisma/client";
import {
  createUser,
  editUsername,
  getUserByEmailOrName,
} from "../../controllers/users";

const router = new Router({
  prefix: "/users",
  methods: ["POST", "GET", "PATCH"],
});

// GET USER BY NAME OR EMAIL

router.get("/", async (ctx) => {
  const nameOrEmail = ctx.query.name || ctx.query.email;
  if (!nameOrEmail)
    return ctx.throw(400, "Provide email or name to fetch user");

  ctx.body = await getUserByEmailOrName(ctx, nameOrEmail as string);
});

// EDIT USER NAME

router.patch("/edit_name/:userId", async (ctx) => {
  const { userId } = ctx.params;
  const { username } = ctx.request.body as { username: string };
  if (!username) return ctx.throw(400, "Provide username");
  ctx.body = await editUsername(ctx, username, Number(userId));
});

// CREATE USER

router.post("/create_user", async (ctx) => {
  const data = ctx.request.body as User;
  ctx.body = await createUser(ctx, data);
});

export default router;
