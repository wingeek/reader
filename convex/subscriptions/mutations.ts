import { v } from "convex/values";
import { mutation, internalMutation } from "../_generated/server";

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

// Update subscription
export const update = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    sourceConfig: v.optional(v.any()),
    filters: v.optional(v.any()),
    isActive: v.optional(v.boolean()),
    collectionFrequency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { subscriptionId, ...updates } = args;
    const now = Date.now();

    await ctx.db.patch(subscriptionId, {
      ...updates,
      updatedAt: now,
    });

    return subscriptionId;
  },
});

// Toggle subscription active status
export const toggleActive = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db.get(args.subscriptionId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }

    await ctx.db.patch(args.subscriptionId, {
      isActive: !subscription.isActive,
      updatedAt: Date.now(),
    });

    return !subscription.isActive;
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
