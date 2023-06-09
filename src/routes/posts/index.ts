import Router from "@koa/router";

const router = new Router({
  prefix: "posts",
  methods: ["POST", "GET", "PATCH", "DELETE"],
});

// GET USER POSTS OR ALL POSTS

router.get("/", (ctx) => {});

// GET USER POST

router.get("/:postId", (ctx) => {
  const { postId } = ctx.params;
});

// CREATE POST

router.post("/", (ctx) => {});

// DELETE POST

router.delete("/:postId", (ctx) => {
  const { postId } = ctx.params;
});

router.patch("/edit_post", (ctx) => {});
