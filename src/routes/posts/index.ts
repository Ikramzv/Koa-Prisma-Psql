import Router from "@koa/router";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
  getUserAllPosts,
} from "../../controllers/posts";
import { validate } from "../../middlewares/posts.middleware";

const router = new Router({
  prefix: "/posts",
  methods: ["POST", "GET", "PATCH", "DELETE"],
});

// GET ALL POSTS

router.get("/", async (ctx) => {
  ctx.body = await getAllPosts(ctx);
});

// GET USER'S ALL POSTS

router.get("/user_posts/:userId", async (ctx) => {
  const { userId } = ctx.params;
  ctx.body = await getUserAllPosts(ctx, Number(userId));
});

// GET POST

router.get("/:postId", async (ctx) => {
  const { postId } = ctx.params;
  ctx.body = await getSinglePost(ctx, Number(postId));
});

// CREATE POST

router.post("/", validate, async (ctx) => {
  const payload = ctx.request.body;
  ctx.body = await createPost(ctx, payload);
});

// DELETE POST

router.delete("/:postId", async (ctx) => {
  const { postId } = ctx.params;
  ctx.body = await deletePost(ctx, Number(postId));
});

// EDIT POST

router.patch("/edit_post/:postId", async (ctx) => {
  const data = ctx.request.body;
  const { postId } = ctx.params;
  ctx.body = await editPost(ctx, Number(postId), data);
});

export default router;
