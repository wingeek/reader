import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Settings, Trash2, Github, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import AddSubscriptionModal from './AddSubscriptionModal';

export default function SubscriptionsPage() {
  const subscriptions = useQuery(api.subscriptions.queries.listAll);
  const removeSubscription = useMutation(api.subscriptions.mutations.remove);
  const toggleActive = useMutation(api.subscriptions.mutations.toggleActive);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<Id<"subscriptions"> | null>(null);

  const handleRemove = async (id: Id<"subscriptions">) => {
    setIsDeleting(id as string);
    try {
      await removeSubscription({ subscriptionId: id });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleToggleActive = async (id: Id<"subscriptions">) => {
    setIsToggling(id);
    try {
      await toggleActive({ subscriptionId: id });
    } finally {
      setIsToggling(null);
    }
  };

  const activeCount = subscriptions?.filter(s => s.isActive).length || 0;

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
              {subscriptions === undefined ? (
                <Loader2 className="inline h-4 w-4 animate-spin" />
              ) : (
                `${activeCount} active source${activeCount !== 1 ? 's' : ''}`
              )}
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
        {subscriptions && subscriptions.length > 0 ? (
          <div className="flex flex-col gap-4 md:gap-6">
            {subscriptions.map((subscription) => (
              <article
                key={subscription._id}
                className={`rounded-lg border p-4 transition-colors ${
                  subscription.isActive
                    ? 'border-gray-200 bg-gray-50 md:bg-transparent'
                    : 'border-gray-100 bg-gray-50 opacity-60 md:bg-transparent'
                } md:px-0 md:py-4`}
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
                      {subscription.isActive ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    {subscription.sourceConfig && (
                      <p className="text-sm text-gray-500">
                        {(subscription.sourceConfig as any).owner}/{(subscription.sourceConfig as any).repo}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{subscription.articleCount} articles</span>
                      <span>·</span>
                      <span className="capitalize">{subscription.collectionFrequency}</span>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(subscription._id)}
                      disabled={isToggling === subscription._id}
                    >
                      {isToggling === subscription._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Settings className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(subscription._id)}
                      disabled={isDeleting === subscription._id}
                    >
                      {isDeleting === subscription._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Filters Display */}
                {subscription.filters && (subscription.filters as any).keywords && (
                  <div className="mt-3 flex flex-wrap gap-2 md:ml-48">
                    {(subscription.filters as any).keywords?.map((keyword: string) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : subscriptions === undefined ? (
          // Loading state
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
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
      <AddSubscriptionModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
