import Router from "@koa/router";

const router = new Router({
  prefix: "users",
  methods: ["POST", "GET", "PATCH"],
});

// GET USER BY NAME OR EMAIL

router.get("/", (ctx) => {
  const nameOrEmail = ctx.query.name || ctx.query.email;
});

// EDIT USER NAME

router.patch("/edit_name/:username", (ctx) => {
  const { username } = ctx.params;
});

// CREATE USER

router.post("/create_user", (ctx) => {});

export default router;
