import Link from "next/link";
import { Calendar, User } from "lucide-react";

import { ProjectCover } from "@/app/_components/portfolio/project-cover";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDatePtBR } from "@/lib/format-date";
import type { BlogPostListItem } from "@/types/blog";

type PostCardProps = {
  post: BlogPostListItem;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card className={featured ? "overflow-hidden border-nangell-cyan/20 bg-nangell-gradient-subtle" : undefined}>
      <Link href={`/blog/${post.slug}`} className="block" aria-label={`Ler artigo: ${post.title}`}>
        <ProjectCover
          src={post.coverImage}
          alt={post.title}
          title={post.title}
          className="rounded-none border-0 border-b border-glass-border"
        />
      </Link>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{post.category}</Badge>
          {featured ? <Badge>Destaque</Badge> : null}
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-nangell-cyan">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-3 text-xs text-nangell-muted">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" aria-hidden />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            {formatDatePtBR(post.publishedAt, { fallback: "Em breve" })}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="muted" className="normal-case">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedPostCard({ post }: { post: BlogPostListItem }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
      <Link href={`/blog/${post.slug}`} className="block" aria-label={`Ler artigo: ${post.title}`}>
        <ProjectCover
          src={post.coverImage}
          alt={post.title}
          title={post.title}
          priority
          className="lg:min-h-[280px]"
        />
      </Link>
      <div>
        <Badge className="mb-3">Destaque</Badge>
        <h2 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-nangell-cyan">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-nangell-muted">{post.excerpt}</p>
        <p className="mt-4 text-sm text-nangell-muted">
          {post.author} · {formatDatePtBR(post.publishedAt, { fallback: "Em breve" })}
        </p>
      </div>
    </div>
  );
}
