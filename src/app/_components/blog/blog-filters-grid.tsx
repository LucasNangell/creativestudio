"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/app/_components/blog/post-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { BlogFilterOptions, BlogPostListItem } from "@/types/blog";

const PAGE_SIZE = 6;

type BlogFiltersGridProps = {
  posts: BlogPostListItem[];
  filters: BlogFilterOptions;
  featuredSlug?: string | null;
  emptyTitle: string;
  emptyDescription: string;
  emptyActionLabel: string;
};

export function BlogFiltersGrid({
  posts,
  filters,
  featuredSlug,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
}: BlogFiltersGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (featuredSlug && post.slug === featuredSlug) return false;

      const q = search.trim().toLowerCase();
      if (q) {
        const haystack = [post.title, post.excerpt, post.category, ...post.tags, post.author]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (category !== "all" && post.category !== category) return false;
      if (tag !== "all" && !post.tags.includes(tag)) return false;

      return true;
    });
  }, [posts, search, category, tag, featuredSlug]);

  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setTag("all");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          label="Buscar artigos"
          placeholder="Título, tag, categoria..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />
        <Select
          label="Categoria"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          options={[
            { label: "Todas", value: "all" },
            ...filters.categories.map((item) => ({ label: item, value: item })),
          ]}
        />
        <Select
          label="Tag"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          options={[
            { label: "Todas", value: "all" },
            ...filters.tags.map((item) => ({ label: item, value: item })),
          ]}
        />
      </div>

      <p className="text-sm text-nangell-muted" aria-live="polite">
        {filtered.length} artigo{filtered.length === 1 ? "" : "s"} encontrado
        {filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={
            <Button variant="outline" onClick={resetFilters}>
              {emptyActionLabel}
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {hasMore ? (
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Carregar mais artigos
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
