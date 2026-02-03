import { v } from "convex/values";
import { mutation } from "../_generated/server";

// Create a new article
export const create = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    sourceType: v.string(),
    sourceId: v.string(),
    sourceUrl: v.string(),
    title: v.string(),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    author: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    language: v.optional(v.string()),
    score: v.optional(v.number()),
    commentsCount: v.optional(v.number()),
    publishedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const articleId = await ctx.db.insert("articles", {
      subscriptionId: args.subscriptionId,
      sourceType: args.sourceType,
      sourceId: args.sourceId,
      sourceUrl: args.sourceUrl,
      title: args.title,
      excerpt: args.excerpt,
      content: args.content,
      author: args.author,
      tags: args.tags,
      language: args.language,
      score: args.score,
      commentsCount: args.commentsCount,
      publishedAt: args.publishedAt,
      collectedAt: now,
      createdAt: now,
      isRead: false,
      isBookmarked: false,
      includedInDailyDigest: false,
      includedInWeeklyDigest: false,
    });

    // Update subscription article count
    const subscription = await ctx.db.get(args.subscriptionId);
    if (subscription) {
      await ctx.db.patch(args.subscriptionId, {
        articleCount: (subscription.articleCount || 0) + 1,
        lastCollectedAt: now,
      });
    }

    return articleId;
  },
});

// Mark article as read
export const markAsRead = mutation({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.articleId, {
      isRead: true,
      readAt: Date.now(),
    });
  },
});

// Toggle bookmark
export const toggleBookmark = mutation({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.articleId);
    if (!article) return;

    await ctx.db.patch(args.articleId, {
      isBookmarked: !article.isBookmarked,
    });
  },
});
