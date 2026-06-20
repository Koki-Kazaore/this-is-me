import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import MermaidRenderer from "../../components/MermaidRenderer";
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <Image
                    src={props.src || ""}
                    alt={props.alt || ""}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "auto" }}
                  />
                ),
                code: (props) => {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";

                  // Check if this is a mermaid code block (not inline)
                  if (language === "mermaid") {
                    return (
                      <MermaidRenderer
                        chart={String(children).replace(/\n$/, "")}
                      />
                    );
                  }

                  return (
                    <code className={className} {...rest}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
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
