import type { Category } from '@prisma/client';
import type { FC } from 'react';
import { Container, Table, Title } from '@mantine/core';
import { trpc } from '../utils/trpc';
import { useSubscribeToEvent } from '../hooks/useSubscribeToEvent';
import { useSession } from 'next-auth/react';
import VoteButton from './VoteButton';
import type { ArticleWithRelations } from '../server/trpc/router/article';

interface ArticleTableProps {
    category: Category;
}

const ArticleTable: FC<ArticleTableProps> = ({ category }) => {
    const { data: articles, refetch: refetchArticles } =
        trpc.article.getArticles.useQuery({
            published: false,
            categoryId: category.id,
        });

    const { data: userData } = useSession();
    const { mutate: voteMutation } = trpc.article.toggleVote.useMutation({
        onSuccess: ({ categoryId }) => {
            if (categoryId === category.id) refetchArticles();
        },
    });

    useSubscribeToEvent({
        callback: (data) => {
            if (
                data.userId !== userData?.user?.id &&
                data.categoryId === category.id
            ) {
                refetchArticles();
            }
        },
        channelName: 'article-channel',
        eventName: 'article-event',
    });

    const handleVote = (articleId: string) => {
        voteMutation({ articleId, categoryId: category.id });
    };

    const isUpvoted = (article: ArticleWithRelations) => {
        return Boolean(
            article.Vote.find((vote) => vote.userId === userData?.user?.id)
        );
    };

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
                        <th>Vote</th>
                    </tr>
                </thead>
                <tbody>
                    {articles?.map((article) => (
                        <tr key={article.URL}>
                            <td>{article.title}</td>
                            <td>{article.URL}</td>
                            <td>{article.description}</td>
                            <td>
                                <VoteButton
                                    onClick={() => handleVote(article.id)}
                                    upvoted={isUpvoted(article)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
export default ArticleTable;
