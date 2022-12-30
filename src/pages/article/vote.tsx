import ArticleTable from '../../components/ArticleTable';
import { trpc } from '../../utils/trpc';

const VotePage = () => {
    const { data: categories } = trpc.article.getCategories.useQuery();

    return (
        <div>
            {categories?.map((category) => (
                <ArticleTable key={category.id} category={category} />
            ))}
        </div>
    );
};

export default VotePage;
