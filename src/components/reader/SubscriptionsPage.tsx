import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Settings, Trash2, Github } from 'lucide-react';

// Temporary mock data - will be replaced with Convex queries
const mockSubscriptions = [
  {
    _id: '1',
    name: 'facebook/react',
    sourceType: 'github',
    description: 'React releases and updates',
    articleCount: 42,
    collectionFrequency: 'daily',
    lastCollectedAt: Date.now() - 3600000, // 1 hour ago
    isActive: true,
    filters: { keywords: ['release', 'feature'] },
  },
];

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [showAddModal, setShowAddModal] = useState(false);

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s._id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-5 py-6 md:px-14 md:py-16">
        <div className="mb-4 flex items-center gap-2 text-xs md:mb-6">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Subscriptions</span>
        </div>

        <div className="mb-4 flex flex-col gap-2 md:mb-0 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-playfair text-[44px] font-normal italic leading-tight md:text-6xl">
              Subscriptions
            </h1>
            <p className="text-sm text-gray-500">
              {subscriptions.length} active sources
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              className="bg-black text-white hover:bg-black/90"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Source
            </Button>
          </div>
        </div>
      </section>

      {/* Subscriptions List */}
      <section className="px-5 py-4 pb-20 md:px-14 md:py-12">
        {subscriptions.length > 0 ? (
          <div className="flex flex-col gap-4 md:gap-6">
            {subscriptions.map((subscription) => (
              <article
                key={subscription._id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:bg-transparent md:px-0 md:py-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  {/* Subscription Info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="border-black bg-black text-white">
                        {subscription.sourceType}
                      </Badge>
                      <h3 className="font-playfair text-lg font-normal italic">
                        {subscription.name}
                      </h3>
                    </div>

                    {subscription.description && (
                      <p className="text-sm text-gray-500">{subscription.description}</p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{subscription.articleCount} articles</span>
                      <span>·</span>
                      <span>{subscription.collectionFrequency}</span>
                      {subscription.lastCollectedAt && (
                        <>
                          <span>·</span>
                          <span>
                            Last: {new Date(subscription.lastCollectedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubscription(subscription._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filters Display */}
                {subscription.filters && (
                  <div className="mt-3 flex flex-wrap gap-2 md:ml-48">
                    {subscription.filters.keywords?.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Github className="mb-4 h-16 w-16 text-gray-300" />
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
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-playfair text-2xl font-normal italic">
                Add Subscription
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Add GitHub repos, HackerNews, Product Hunt, and WeChat subscriptions.
            </p>
            <Button className="mt-6 w-full" onClick={() => setShowAddModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
