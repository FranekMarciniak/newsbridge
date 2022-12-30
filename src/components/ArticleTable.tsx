import type { Category } from '@prisma/client';
import type { FC } from 'react';
import { ActionIcon, Button, Container, Table, Title } from '@mantine/core';
import { trpc } from '../utils/trpc';
import { IconDots } from '@tabler/icons';
// import { IconDots } from '@tabler/icons';

interface ArticleTableProps {
    category: Category;
}

const ArticleTable: FC<ArticleTableProps> = ({ category }) => {
    const { data: articles } = trpc.article.getArticles.useQuery({
        published: false,
        categoryId: category.id,
    });

    return (
        <Container p="md">
            <Title order={2} sx={{ textTransform: 'capitalize' }}>
                {category.name}
            </Title>
            <Table highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Published</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles?.map((article) => (
                        <tr key={article.URL}>
                            <td>{article.title}</td>
                            <td>{article.URL}</td>
                            <td>{article.description}</td>
                            <td>{Boolean(article.newsletterId).toString()}</td>
                            <td>
                                <ActionIcon color="blue" variant="light">
                                    <IconDots size={18} />
                                </ActionIcon>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
export default ArticleTable;
