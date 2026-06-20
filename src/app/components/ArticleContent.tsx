import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import MermaidRenderer from "./MermaidRenderer";

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
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
      {content}
    </ReactMarkdown>
  );
};

export default ArticleContent;
