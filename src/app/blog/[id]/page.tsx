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
    <main className="flex min-w-0 max-w-full flex-col min-h-screen">
      <Navbar />
      <div className="mx-auto w-full min-w-0 max-w-3xl flex-grow px-6 pt-24">
        <article className="pb-16 pt-12 sm:pt-16">
          <p className="font-mono text-sm text-fg-subtle">{article.date}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fg [overflow-wrap:anywhere] sm:text-4xl">{article.title}</h1>
          <div className="prose prose-invert mt-10 min-w-0 max-w-none [overflow-wrap:anywhere]">
            <ArticleContent content={article.content} />
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
};

export async function generateStaticParams() {
  return listArticleIds().map((id) => ({ id }));
}

export default BlogDetail;
