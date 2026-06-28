import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/Footer";
import ArticleContent from "../../components/ArticleContent";
import { getArticle, listArticleIds } from "@/lib/articles";

type Props = {
  params: Promise<{ id: string }>;
};

const BlogDetail = async ({ params }: Props) => {
  const { id } = await params;
  const article = getArticle(id);

  // check if the article exists
  if (!article) {
    return <div>404 - Page Not Found</div>;
  }

  return (
    <main className="flex min-w-0 max-w-full flex-col min-h-screen bg-[rgb(18,18,18)]">
      <Navbar />
      <div className="flex-grow flex w-full min-w-0 max-w-full justify-center items-center mt-24 mx-auto px-4 py-4 sm:px-12">
        <div className="w-full min-w-0 max-w-full sm:max-w-3xl">
          <p className="text-gray-400">{article.date}</p>
          <h1 className="text-4xl font-semibold text-white [overflow-wrap:anywhere]">{article.title}</h1>
          <div className="prose prose-invert mt-4 min-w-0 max-w-none [overflow-wrap:anywhere]">
            <ArticleContent content={article.content} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export async function generateStaticParams() {
  return listArticleIds().map((id) => ({ id }));
}

export default BlogDetail;
