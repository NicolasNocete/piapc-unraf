import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { dirname, normalize } from "node:path/posix";

type Props = {
  children: string;
  sourcePath: string;
  links: Record<string, string>;
};

export function ContentMarkdown({ children, sourcePath, links }: Props) {
  return (
    <div className="content-markdown text-base leading-8 text-[#31483a]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href = "", children: label }) {
            const [path, hash] = href.split("#", 2);
            if (path.endsWith(".md")) {
              const target = normalize(`${dirname(sourcePath)}/${path}`);
              const id = links[target];
              return id ? <Link href={`/contenidos/${id}${hash ? `#${hash}` : ""}`}>{label}</Link> : <span>{label}</span>;
            }
            if (/^(https?:|mailto:)/.test(href)) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer noopener" : undefined}>{label}</a>;
            return <span>{label}</span>;
          },
        }}
      >{children}</ReactMarkdown>
    </div>
  );
}
