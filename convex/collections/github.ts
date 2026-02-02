import { v } from "convex/values";
import { action } from "../_generated/server";

// GitHub collector - fetches releases, issues, PRs
export const collectReleases = action({
  args: {
    owner: v.string(),
    repo: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await fetch(
      `https://api.github.com/repos/${args.owner}/${args.repo}/releases?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Reader-App",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const releases = await response.json();

    // For now, just return the data
    // TODO: Store in database after schema is properly set up
    return {
      count: releases.length,
      releases: releases.map((release: any) => ({
        id: release.id,
        name: release.name || release.tag_name,
        url: release.html_url,
        author: release.author?.login,
        publishedAt: release.published_at,
      })),
    };
  },
});

export const collectIssues = action({
  args: {
    owner: v.string(),
    repo: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await fetch(
      `https://api.github.com/repos/${args.owner}/${args.repo}/issues?state=open&per_page=10&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Reader-App",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const issues = await response.json();
    const filtered = issues.filter((issue: any) => !issue.pull_request);

    return {
      count: filtered.length,
      issues: filtered.map((issue: any) => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        author: issue.user?.login,
        createdAt: issue.created_at,
        comments: issue.comments,
      })),
    };
  },
});
