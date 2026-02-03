import { mutation, internalMutation } from "../_generated/server";

// Cron job to collect content from all active subscriptions
// Runs every hour
export const collectFromSubscriptions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Get all active subscriptions that are due for collection
    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", "guest").eq("isActive", true)
      )
      .collect();

    let totalCollected = 0;
    const results: any[] = [];

    for (const subscription of subscriptions) {
      // Check if subscription is due for collection
      if (subscription.nextCollectionAt && subscription.nextCollectionAt > now) {
        continue;
      }

      // Calculate next collection time based on frequency
      const nextCollectionAt = calculateNextCollection(subscription.collectionFrequency);

      try {
        let collectedCount = 0;

        // Collect based on source type
        if (subscription.sourceType === "github") {
          const config = subscription.sourceConfig as any;
          if (config && config.owner && config.repo) {
            // Collect releases
            await ctx.scheduler.runAfter(0, internal.collections.github.collectReleases, {
              subscriptionId: subscription._id,
              owner: config.owner,
              repo: config.repo,
            });

            // Collect issues
            await ctx.scheduler.runAfter(0, internal.collections.github.collectIssues, {
              subscriptionId: subscription._id,
              owner: config.owner,
              repo: config.repo,
            });

            collectedCount = 20; // Approximate (10 releases + 10 issues)
          }
        }

        // Update subscription next collection time
        await ctx.db.patch(subscription._id, {
          nextCollectionAt,
        });

        // Record collection job
        await ctx.db.insert("collectionJobs", {
          subscriptionId: subscription._id,
          status: "completed",
          articlesCollected: collectedCount,
          startedAt: now,
          completedAt: now + 1000,
        });

        totalCollected += collectedCount;
        results.push({
          subscriptionId: subscription._id,
          name: subscription.name,
          status: "success",
          collected: collectedCount,
        });
      } catch (error) {
        // Record failed collection job
        await ctx.db.insert("collectionJobs", {
          subscriptionId: subscription._id,
          status: "failed",
          articlesCollected: 0,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
          startedAt: now,
          completedAt: now + 1000,
        });

        results.push({
          subscriptionId: subscription._id,
          name: subscription.name,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return {
      totalSubscriptions: subscriptions.length,
      totalCollected,
      results,
    };
  },
});

// Helper function to calculate next collection time
function calculateNextCollection(frequency: string): number {
  const now = Date.now();
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;
  const week = 7 * day;

  switch (frequency) {
    case "hourly":
      return now + hour;
    case "daily":
      return now + day;
    case "weekly":
      return now + week;
    default:
      return now + hour;
  }
}