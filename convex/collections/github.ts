import { v } from "convex/values";
import { action, mutation } from "../_generated/server";

// GitHub collector - fetches releases, issues, PRs
export const collectReleases = action({
  args: {
    subscriptionId: v.id("subscriptions"),
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

    // Store each release as an article
    const results = await ctx.runMutation(internal.collections.github.saveReleases, {
      subscriptionId: args.subscriptionId,
      owner: args.owner,
      repo: args.repo,
      releases,
    });

    return results;
  },
});

export const collectIssues = action({
  args: {
    subscriptionId: v.id("subscriptions"),
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

    // Store each issue as an article
    const results = await ctx.runMutation(internal.collections.github.saveIssues, {
      subscriptionId: args.subscriptionId,
      owner: args.owner,
      repo: args.repo,
      issues: filtered,
    });

    return results;
  },
});

// Internal mutations for saving collected data
export const saveReleases = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    owner: v.string(),
    repo: v.string(),
    releases: v.any(),
  },
  handler: async (ctx, args) => {
    let savedCount = 0;

    for (const release of args.releases) {
      const sourceId = `release-${release.id}`;
      const existing = await ctx.db
        .query("articles")
        .filter((q) => q.eq(q.field("sourceId"), sourceId))
        .first();

      if (!existing) {
        await ctx.db.insert("articles", {
          subscriptionId: args.subscriptionId,
          sourceType: "github",
          sourceId,
          sourceUrl: release.html_url,
          title: release.name || release.tag_name,
          excerpt: release.body?.substring(0, 200),
          content: release.body,
          author: release.author?.login,
          tags: ["release", args.repo],
          score: 0,
          publishedAt: new Date(release.published_at).getTime(),
          collectedAt: Date.now(),
          createdAt: Date.now(),
          isRead: false,
          isBookmarked: false,
          includedInDailyDigest: false,
          includedInWeeklyDigest: false,
        });
        savedCount++;
      }
    }

    // Update subscription article count
    const subscription = await ctx.db.get(args.subscriptionId);
    if (subscription) {
      await ctx.db.patch(args.subscriptionId, {
        articleCount: (subscription.articleCount || 0) + savedCount,
        lastCollectedAt: Date.now(),
      });
    }

    return { savedCount, total: args.releases.length };
  },
});

export const saveIssues = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    owner: v.string(),
    repo: v.string(),
    issues: v.any(),
  },
  handler: async (ctx, args) => {
    let savedCount = 0;

    for (const issue of args.issues) {
      const sourceId = `issue-${issue.id}`;
      const existing = await ctx.db
        .query("articles")
        .filter((q) => q.eq(q.field("sourceId"), sourceId))
        .first();

      if (!existing) {
        await ctx.db.insert("articles", {
          subscriptionId: args.subscriptionId,
          sourceType: "github",
          sourceId,
          sourceUrl: issue.html_url,
          title: issue.title,
          excerpt: issue.body?.substring(0, 200),
          content: issue.body,
          author: issue.user?.login,
          tags: ["issue", args.repo],
          commentsCount: issue.comments,
          score: 0,
          publishedAt: new Date(issue.created_at).getTime(),
          collectedAt: Date.now(),
          createdAt: Date.now(),
          isRead: false,
          isBookmarked: false,
          includedInDailyDigest: false,
          includedInWeeklyDigest: false,
        });
        savedCount++;
      }
    }

    // Update subscription article count
    const subscription = await ctx.db.get(args.subscriptionId);
    if (subscription) {
      await ctx.db.patch(args.subscriptionId, {
        articleCount: (subscription.articleCount || 0) + savedCount,
        lastCollectedAt: Date.now(),
      });
    }

    return { savedCount, total: args.issues.length };
  },
});
