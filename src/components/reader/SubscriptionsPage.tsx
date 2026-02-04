import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';
import { Plus, MoreVertical, Loader2 } from 'lucide-react';
import AddSubscriptionModal from './AddSubscriptionModal';

type FilterType = 'all' | 'blogs' | 'news' | 'podcasts';

export default function SubscriptionsPage() {
  const subscriptions = useQuery(api.subscriptions.queries.listAll);
  const removeSubscription = useMutation(api.subscriptions.mutations.remove);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Calculate stats
  const activeCount = subscriptions?.filter(s => s.isActive).length || 0;
  const totalArticles = subscriptions?.reduce((sum, s) => sum + (s.articleCount || 0), 0) || 0;
  const unreadCount = 5; // This would come from actual data

  // Filter subscriptions
  const filteredSubscriptions = subscriptions?.filter(sub => {
    if (activeFilter === 'all') return true;
    // Add actual filtering logic based on sourceType or other properties
    return true;
  }) || [];

  // Split into two columns
  const leftColumn = filteredSubscriptions.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredSubscriptions.filter((_, i) => i % 2 === 1);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-5 py-6 md:px-14 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Subscriptions</span>
        </div>

        {/* Title and Add Button */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-playfair text-5xl font-normal italic leading-tight tracking-tight md:text-[56px]">
              Your Subscriptions
            </h1>
            <p className="text-sm text-gray-500">Manage your content sources</p>
          </div>

          <Button
            className="bg-black text-white hover:bg-black/90"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 md:gap-16">
          <div className="flex flex-col gap-1">
            <div className="font-playfair text-3xl font-normal italic md:text-[32px]">
              {activeCount}
            </div>
            <div className="text-xs text-gray-500">Active Sources</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-playfair text-3xl font-normal italic md:text-[32px]">
              {totalArticles}
            </div>
            <div className="text-xs text-gray-500">Articles This Month</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-playfair text-3xl font-normal italic md:text-[32px]">
              {unreadCount}
            </div>
            <div className="text-xs text-gray-500">Unread Updates</div>
          </div>
        </div>
      </section>

      {/* Subscriptions List Section */}
      <section className="px-5 py-4 pb-20 md:px-14 md:py-20">
        {/* Section Header with Filters */}
        <div className="mb-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h2 className="font-playfair text-2xl font-normal italic md:text-[28px]">
            Content Sources
          </h2>

          {/* Filters */}
          <div className="flex gap-3">
            {(['all', 'blogs', 'news', 'podcasts'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors
                  ${activeFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-transparent text-gray-600 hover:text-black'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Grid Layout */}
        {subscriptions && subscriptions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {leftColumn.map((subscription) => (
                <SubscriptionCard
                  key={subscription._id}
                  subscription={subscription}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {rightColumn.map((subscription) => (
                <SubscriptionCard
                  key={subscription._id}
                  subscription={subscription}
                />
              ))}
            </div>
          </div>
        ) : subscriptions === undefined ? (
          // Loading state
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Plus className="mb-4 h-16 w-16 text-gray-300" />
            <h2 className="font-playfair text-2xl font-normal italic text-gray-900">
              No subscriptions yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Add your first source to start tracking content
            </p>
            <Button
              className="mt-6 bg-black text-white hover:bg-black/90"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Source
            </Button>
          </div>
        )}
      </section>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}

// Subscription Card Component
function SubscriptionCard({ subscription }: { subscription: any }) {
  // Generate icon letter from first character
  const iconLetter = subscription.name?.charAt(0).toUpperCase() || '?';

  // Calculate unread count (this would come from actual data)
  const unreadCount = subscription.unreadCount || 0;

  // Format update time
  const updateTime = subscription.lastCollectedAt
    ? formatRelativeTime(new Date(subscription.lastCollectedAt))
    : 'Not updated';

  return (
    <article className="group relative rounded-xl bg-[#F9F9F9] p-7 transition-all hover:bg-[#F2F2F2] hover:shadow-md md:p-8">
      <div className="flex items-start justify-between">
        {/* Left: Icon + Info */}
        <div className="flex items-center gap-6">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-black">
            <span className="font-playfair text-2xl font-bold italic text-white">
              {iconLetter}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-black">
              {subscription.name}
            </h3>
            <p className="text-xs text-gray-500">
              {subscription.articleCount || 0} articles · Updated {updateTime}
            </p>
          </div>
        </div>

        {/* Right: Status + Actions */}
        <div className="flex items-center gap-2">
          {/* Unread Badge */}
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-md bg-black px-4 py-2.5 text-xs font-bold text-white">
              {unreadCount} new
            </span>
          )}

          {/* Menu Button */}
          <button className="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
