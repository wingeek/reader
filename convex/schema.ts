import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User subscriptions to various sources
  subscriptions: defineTable({
    // Metadata
    userId: v.string(), // User identifier (anonymous/guest initially)
    name: v.string(), // User-friendly name for the subscription
    description: v.optional(v.string()), // Optional description

    // Source configuration
    sourceType: v.string(), // 'github', 'hackernews', 'producthunt', 'wechat'
    sourceConfig: v.optional(v.any()), // Flexible config for different source types

    // Filtering configuration
    filters: v.optional(v.any()), // Flexible filters

    // Status and metadata
    isActive: v.boolean(), // Enable/disable subscription
    lastCollectedAt: v.optional(v.number()), // Timestamp of last collection
    nextCollectionAt: v.optional(v.number()), // Scheduled next collection
    collectionFrequency: v.string(), // 'hourly', 'daily', 'weekly'
    articleCount: v.number(), // Total articles collected

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_active", ["userId", "isActive"])
    .index("by_next_collection", ["nextCollectionAt"]),

  // Collected articles/items from all sources
  articles: defineTable({
    // Source reference
    subscriptionId: v.id("subscriptions"),
    sourceType: v.string(),
    sourceId: v.string(), // External ID (e.g., GitHub issue number)
    sourceUrl: v.string(), // URL to original content

    // Content
    title: v.string(),
    excerpt: v.optional(v.string()), // AI-generated summary
    content: v.optional(v.string()), // Full content (if available)
    author: v.optional(v.string()),

    // Categorization
    tags: v.optional(v.array(v.string())),
    language: v.optional(v.string()),

    // Engagement metrics
    score: v.optional(v.number()), // HN upvotes, GitHub reactions, etc.
    commentsCount: v.optional(v.number()),

    // Status
    isRead: v.boolean(),
    isBookmarked: v.boolean(),
    readAt: v.optional(v.number()),

    // Digest inclusion
    includedInDailyDigest: v.boolean(),
    includedInWeeklyDigest: v.boolean(),

    // Timestamps
    publishedAt: v.number(), // Original publication date
    collectedAt: v.number(), // When collected
    createdAt: v.number(),
  })
    .index("by_subscription", ["subscriptionId"])
    .index("by_subscription_read", ["subscriptionId", "isRead"])
    .index("by_collected_desc", ["collectedAt"])
    .index("by_published_desc", ["publishedAt"])
    .index("by_bookmarked", ["isBookmarked"]),

  // Collection job history (for monitoring)
  collectionJobs: defineTable({
    subscriptionId: v.id("subscriptions"),
    status: v.string(), // 'running', 'completed', 'failed'
    articlesCollected: v.number(),
    errorMessage: v.optional(v.string()),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_subscription", ["subscriptionId"])
    .index("by_status", ["status"])
    .index("by_started", ["startedAt"]),
});
