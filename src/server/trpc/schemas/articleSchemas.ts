import { z } from 'zod';

export const articleSchema = z.object({
    link: z.string(),
    title: z.string().min(10),
    category: z.string().cuid(),
    description: z.string().optional(),
    user: z.string().cuid(),
});
