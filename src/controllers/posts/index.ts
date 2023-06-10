import { Context } from "koa";
import prisma from "../../prisma";

export const createPost = async (ctx: Context, data: any) => {
  try {
    const post = await prisma.post.create({
      data: {
        author: {
          connect: {
            id: ctx.state.user.id,
          },
        },
        ...data,
      },
    });
    console.log(post);
    return post;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const getAllPosts = async (ctx: Context) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return posts;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const getUserAllPosts = async (ctx: Context, userId: number) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
    return posts;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const getSinglePost = async (ctx: Context, postId: number) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });
    return post;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const editPost = async (ctx: Context, postId: number, data: any) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });
    return post;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const deletePost = async (ctx: Context, postId: number) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return deletedPost;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};
