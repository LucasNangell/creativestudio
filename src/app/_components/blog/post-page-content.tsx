import Link from "next/link";
import { Calendar, User } from "lucide-react";

import { PostCard } from "@/app/_components/blog/post-card";
import { PostShare } from "@/app/_components/blog/post-share";
import { PostToc } from "@/app/_components/blog/post-toc";
import { ProjectCover } from "@/app/_components/portfolio/project-cover";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { blogPageContent } from "@/data/blog/enriched-content";
import { extractMarkdownHeadings } from "@/lib/markdown/toc";
import { formatDatePtBR } from "@/lib/format-date";
import type { BlogPostDetail, BlogPostListItem } from "@/types/blog";
import { cn } from "@/lib/utils";

type PostPageContentProps = {
  post: BlogPostDetail;
  relatedPosts: BlogPostListItem[];
  canonicalUrl: string;
};

export function PostPageContent({ post, relatedPosts, canonicalUrl }: PostPageContentProps) {
  const headings = extractMarkdownHeadings(post.content);
  const { postCta, relatedTitle } = blogPageContent;

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="muted" className="normal-case">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight text-nangell-text sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-nangell-muted">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-nangell-muted">
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-nangell-cyan" aria-hidden />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-nangell-cyan" aria-hidden />
              {formatDatePtBR(post.publishedAt)}
            </span>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="max-w-4xl">
          <ProjectCover
            src={post.coverImage}
            alt={post.title}
            title={post.title}
            priority
            className="mb-8"
          />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <PostToc headings={headings} />
                <PostShare url={canonicalUrl} title={post.title} />
              </div>
            </aside>

            <article className="min-w-0">
              <MarkdownContent content={post.content} />

              <div className="mt-10 lg:hidden">
                <PostToc headings={headings} className="mb-4" />
                <PostShare url={canonicalUrl} title={post.title} />
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 ? (
        <Section className="bg-nangell-surface/20">
          <Container>
            <h2 className="mb-6 font-heading text-2xl font-bold text-nangell-text">
              {relatedTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection title={postCta.title} description={postCta.description} variant="gradient">
        <Link href={postCta.primary.href} className={cn(buttonVariants({ variant: "primary" }))}>
          {postCta.primary.label}
        </Link>
      </CtaSection>
    </>
  );
}
