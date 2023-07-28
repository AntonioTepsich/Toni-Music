import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const appsConnectedRouter = createTRPCRouter({
  getProviders: protectedProcedure.query(async({ ctx })=>{
    const providers = await ctx.prisma.account.findMany({
        where: {
            userId: ctx.session.user.id,
        }
    });
    return providers;
  }),
})

