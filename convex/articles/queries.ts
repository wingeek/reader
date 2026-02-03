import { query } from "../_generated/server";
import { v } from "convex/values";

// List recent articles
export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    const articles = await ctx.db
      .query("articles")
      .withIndex("by_collected_desc")
      .order("desc")
      .take(limit);

    return articles;
  },
});

// List articles by subscription
export const listBySubscription = query({
  args: {
    subscriptionId: v.id("subscriptions"),
  },
  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("articles")
      .withIndex("by_subscription", (q) =>
        q.eq("subscriptionId", args.subscriptionId)
      )
      .collect();

    return articles;
  },
});

// Get article by source ID
export const bySourceId = query({
  args: {
    sourceId: v.string(),
  },
  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("articles")
      .collect();

    const article = articles.find((a) => a.sourceId === args.sourceId);
    return article || null;
  },
});

// Get unread articles
export const listUnread = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;

    const articles = await ctx.db
      .query("articles")
      .withIndex("by_collected_desc")
      .order("desc")
      .filter((q) => q.eq(q.field("isRead"), false))
      .take(limit);

    return articles;
  },
});

// Get bookmarked articles
export const listBookmarked = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("articles")
      .withIndex("by_bookmarked")
      .collect();

    return articles;
  },
});

// Get a single article by ID
export const get = query({
  args: {
    id: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
    return article;
  },
});
