import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import path from "path";
import prisma from "./prisma";
import router from "./routes";

const main = async () => {
  const app = new Koa();

  const PORT = process.env.PORT || 5000;

  app.use(serve(path.resolve("public")));
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
    }
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(PORT, () => {
    console.log("App is running on port :", PORT);
  });
};

main()
  .catch(async (err) => {
    console.log("---- SET UP ERROR ----", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
