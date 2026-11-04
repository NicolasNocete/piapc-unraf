import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function FeedbackMarkdown({ children }: { children: string }) {
  return (
    <div className="feedback-markdown min-w-0 max-w-full text-sm leading-6 [overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children: label }) {
            if (!href || !/^(https?:\/\/|mailto:)/i.test(href)) return <span>{label}</span>;
            return <a href={href} target={/^https?:/i.test(href) ? "_blank" : undefined} rel="noreferrer noopener">{label}</a>;
          },
          img({ alt }) {
            return <span>{alt ? `[Imagen: ${alt}]` : "[Imagen]"}</span>;
          },
          table({ children: rows }) {
            return (
              <div className="max-w-full overflow-x-auto rounded-md focus-visible:outline-2 focus-visible:outline-ring" role="region" aria-label="Tabla de la devolución" tabIndex={0}>
                <table>{rows}</table>
              </div>
            );
          },
          pre({ children: code }) {
            return <pre tabIndex={0} aria-label="Código de la devolución">{code}</pre>;
          },
        }}
      >{children}</ReactMarkdown>
    </div>
  );
}
