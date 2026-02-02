import { query } from "../_generated/server";
import { v } from "convex/values";

// List all active subscriptions for a user
export const listActive = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || "guest"; // Default to guest user

    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", userId).eq("isActive", true)
      )
      .collect();

    return subscriptions;
  },
});

// Get all subscriptions (including inactive)
export const listAll = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || "guest";

    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return subscriptions;
  },
});

// Get a single subscription by ID
export const get = query({
  args: {
    id: v.id("subscriptions"),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db.get(args.id);
    return subscription;
  },
});

// Get subscriptions due for collection
export const listDueForCollection = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_next_collection", (q) =>
        q.lte("nextCollectionAt", now)
      )
      .collect();

    return subscriptions;
  },
});
