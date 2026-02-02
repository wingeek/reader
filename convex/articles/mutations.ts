import { v } from "convex/values";
import { mutation } from "../_generated/server";

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
