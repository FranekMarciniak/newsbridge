import { trpc } from '../../utils/trpc';

const VotePage = () => {
    const { data } = trpc.article.getArticles.useQuery({ published: false });
    return <div>{JSON.stringify(data)}</div>;
};

export default VotePage;
