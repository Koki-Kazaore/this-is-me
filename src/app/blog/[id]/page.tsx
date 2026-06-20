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
    <main className="flex flex-col min-h-screen bg-[rgb(18,18,18)]">
      <Navbar />
      <div className="flex-grow flex justify-center items-center mt-24 mx-auto px-12 py-4">
        <div className="max-w-3xl w-full">
          <p className="text-gray-400">{article.date}</p>
          <h1 className="text-4xl font-semibold text-white">{article.title}</h1>
          <div className="prose prose-invert mt-4 max-w-none">
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
