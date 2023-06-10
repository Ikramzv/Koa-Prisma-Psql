import { User } from "@prisma/client";
import { Context } from "koa";
import prisma from "../../prisma";
import { encrypt } from "../../utils";

export const createUser = async (ctx: Context, data: User) => {
  try {
    const { encrypted } = encrypt(data.password);
    data.password = encrypted;
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

const findByName = async (name: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
      include: {
        posts: true,
      },
    });
    console.log("FETCHED BY NAME: ", user);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const findByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        posts: true,
      },
    });
    console.log("FETCHED BY EMAIL: ", user);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserByEmailOrName = async (
  ctx: Context,
  nameOrEmail: string
) => {
  try {
    let isEmail = nameOrEmail.includes("@");
    if (isEmail) return await findByEmail(nameOrEmail);
    return await findByName(nameOrEmail);
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};

export const editUsername = async (
  ctx: Context,
  username: string,
  userId: number
) => {
  try {
    const user = await prisma.user.update({
      data: {
        name: username,
      },
      where: {
        id: userId,
      },
    });
    console.log("UPDATED: ", user);
    return user;
  } catch (error: any) {
    ctx.status = 400;
    return error.message;
  }
};
