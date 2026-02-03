import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run every hour to collect new content from active subscriptions
crons.interval(
  "collect from subscriptions",
  { hours: 1 },
  internal.subscriptions.cron.collectFromSubscriptions
);

export default crons;
