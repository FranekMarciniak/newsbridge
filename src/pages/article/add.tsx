import { TextInput, Button, Group, Box, Select, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import { capitalize } from '../../utils/capitalize';
import { useSession } from 'next-auth/react';
import { showNotification } from '@mantine/notifications';

const articleSchema = z.object({
    link: z
        .string()
        .regex(
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            { message: 'Enter valid link' }
        ),
    title: z.string().min(10),
    category: z.string().cuid(),
    description: z.string().optional(),
});

type ArticleSchema = z.infer<typeof articleSchema>;
const AddArticle = () => {
    const { data } = useSession();
    const { data: categories } = trpc.article.getCategories.useQuery();
    const { mutate, isLoading } = trpc.article.postArticle.useMutation();
    const form = useForm({
        initialValues: {
            link: '',
            category: '',
            title: '',
            description: '',
        },

        validate: zodResolver(articleSchema),
    });

    const handleSubmit = (values: ArticleSchema) => {
        if (!data?.user?.id) return;
        mutate(
            { ...values, user: data.user.id },
            {
                onSuccess: () => {
                    showNotification({
                        message: 'Article added',
                        title: 'Success!',
                        color: 'green',
                    });
                },
                onError: (err) => {
                    showNotification({
                        message: err.message,
                        title: 'Error',
                        color: 'red',
                    });
                },
            }
        );
    };

    return (
        <Box sx={{ maxWidth: 600 }} mx="auto" mt="xl">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Link"
                    placeholder="https://"
                    {...form.getInputProps('link')}
                />
                <Select
                    mt="md"
                    searchable
                    clearable
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    data={
                        categories?.map((category) => {
                            return {
                                value: category.id,
                                label: capitalize(category.name),
                            };
                        }) ?? []
                    }
                    placeholder="Select category"
                    required
                    withAsterisk
                    label="Category"
                    {...form.getInputProps('category')}
                />
                <TextInput
                    withAsterisk
                    label="Title"
                    placeholder="Meaningful article title"
                    mt="md"
                    {...form.getInputProps('title')}
                />
                <Textarea
                    label="Description"
                    placeholder="Short description of the article"
                    mt="md"
                    {...form.getInputProps('description')}
                ></Textarea>
                <Group position="right" mt="md">
                    <Button
                        type="submit"
                        loading={isLoading}
                        loaderProps={{ type: 'dots' }}
                    >
                        Submit
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
export default AddArticle;
