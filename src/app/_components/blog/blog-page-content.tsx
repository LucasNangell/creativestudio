"use client";

import Link from "next/link";

import { BlogFiltersGrid } from "@/app/_components/blog/blog-filters-grid";
import { FeaturedPostCard } from "@/app/_components/blog/post-card";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { blogPageContent } from "@/data/blog/enriched-content";
import type { BlogFilterOptions, BlogPostListItem } from "@/types/blog";
import { cn } from "@/lib/utils";

type BlogPageContentProps = {
  posts: BlogPostListItem[];
  filters: BlogFilterOptions;
  featured: BlogPostListItem | null;
};

export function BlogPageContent({ posts, filters, featured }: BlogPageContentProps) {
  const { hero, cta, emptyState } = blogPageContent;

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            align="left"
          >
            <Link href={cta.primary.href} className={cn(buttonVariants({ variant: "primary" }))}>
              {cta.primary.label}
            </Link>
          </PageHero>
        </Container>
      </Section>

      {featured ? (
        <Section className="pt-0">
          <Container>
            <div className="glass-card p-6 sm:p-8">
              <FeaturedPostCard post={featured} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="blog-grid">
        <Container>
          <BlogFiltersGrid
            posts={posts}
            filters={filters}
            featuredSlug={featured?.slug}
            emptyTitle={emptyState.title}
            emptyDescription={emptyState.description}
            emptyActionLabel={emptyState.action}
          />
        </Container>
      </Section>

      <CtaSection title={cta.title} description={cta.description} variant="gradient">
        <Link href={cta.primary.href} className={cn(buttonVariants({ variant: "primary" }))}>
          {cta.primary.label}
        </Link>
        <Link href={cta.secondary.href} className={cn(buttonVariants({ variant: "outline" }))}>
          {cta.secondary.label}
        </Link>
      </CtaSection>
    </>
  );
}
