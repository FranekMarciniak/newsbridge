import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';
import { articleSchema } from '../schemas/articleSchemas';

export const articleRouter = router({
    getCategories: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.category.findMany();
    }),
    getArticles: protectedProcedure
        .input(z.object({ published: z.boolean() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.article.findMany({
                where: {
                    ...(input.published
                        ? {
                              newsletterId: {
                                  not: null,
                              },
                          }
                        : { newsletterId: null }),
                },
                include: {
                    category: true,
                    Vote: true,
                    createdBy: true,
                    tagsOnPosts: true,
                },
            });
        }),
    postArticle: protectedProcedure
        .input(articleSchema)
        .mutation(({ ctx, input }) => {
            const {
                title,
                description,
                category: categoryId,
                user: userId,
                link: URL,
            } = input;
            return ctx.prisma.article.create({
                data: {
                    categoryId,
                    title,
                    description,
                    userId,
                    URL,
                },
            });
        }),
});
