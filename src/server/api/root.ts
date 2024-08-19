import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { commitRouter } from "./routers/commit";
import { paperRouter } from "./routers/paper";
import { sectionRouter } from "./routers/section";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  paper: paperRouter,
  section: sectionRouter,
  commit: commitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
