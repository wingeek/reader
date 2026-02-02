import { v } from "convex/values";
import { mutation } from "../_generated/server";

// Create a new subscription
export const create = mutation({
  args: {
    name: v.string(),
    sourceType: v.string(),
    sourceConfig: v.any(),
    collectionFrequency: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = "guest"; // Default to guest user
    const now = Date.now();

    const subscriptionId = await ctx.db.insert("subscriptions", {
      userId,
      name: args.name,
      sourceType: args.sourceType,
      sourceConfig: args.sourceConfig,
      isActive: true,
      collectionFrequency: args.collectionFrequency,
      articleCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return subscriptionId;
  },
});

// Delete subscription
export const remove = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.subscriptionId);
  },
});
