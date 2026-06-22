import { LeadStatus, PostStatus, ProjectStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type AdminDashboardStats = {
  totalLeads: number;
  newLeads: number;
  publishedProjects: number;
  publishedPosts: number;
  demoCases: number;
  recentLeads: {
    id: string;
    name: string;
    email: string;
    company: string;
    projectType: string;
    status: LeadStatus;
    createdAt: Date;
  }[];
};

const EMPTY_STATS: AdminDashboardStats = {
  totalLeads: 0,
  newLeads: 0,
  publishedProjects: 0,
  publishedPosts: 0,
  demoCases: 0,
  recentLeads: [],
};

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  try {
    const [totalLeads, newLeads, publishedProjects, publishedPosts, demoCases, recentLeads] =
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: LeadStatus.NOVO } }),
        prisma.project.count({ where: { status: ProjectStatus.PUBLISHED } }),
        prisma.post.count({ where: { status: PostStatus.PUBLISHED } }),
        prisma.project.count({
          where: {
            status: ProjectStatus.PUBLISHED,
            demoRoute: { not: null },
          },
        }),
        prisma.lead.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            projectType: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    return {
      totalLeads,
      newLeads,
      publishedProjects,
      publishedPosts,
      demoCases,
      recentLeads,
    };
  } catch (error) {
    console.error("[admin-dashboard-service]", error);
    return EMPTY_STATS;
  }
}

export async function getAdminUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
}
