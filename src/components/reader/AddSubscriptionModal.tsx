import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Github, Loader2 } from 'lucide-react';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSubscriptionModal({ isOpen, onClose }: AddSubscriptionModalProps) {
  const createSubscription = useMutation(api.subscriptions.mutations.create);
  const collectReleases = useMutation(api.collections.github.collectReleases);
  const collectIssues = useMutation(api.collections.github.collectIssues);

  const [sourceType, setSourceType] = useState<'github' | 'hackernews' | 'producthunt' | 'wechat'>('github');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'weekly'>('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const sourceTypes = [
    { id: 'github', label: 'GitHub', icon: Github, available: true },
    { id: 'hackernews', label: 'HackerNews', icon: null, available: false },
    { id: 'producthunt', label: 'Product Hunt', icon: null, available: false },
    { id: 'wechat', label: 'WeChat', icon: null, available: false },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Create subscription
      const subscriptionId = await createSubscription({
        name: name || `${owner}/${repo}`,
        sourceType,
        sourceConfig: { owner, repo },
        collectionFrequency: frequency,
      });

      // Trigger initial collection
      await Promise.all([
        collectReleases({ subscriptionId, owner, repo }),
        collectIssues({ subscriptionId, owner, repo }),
      ]);

      // Reset form and close modal
      setOwner('');
      setRepo('');
      setName('');
      setDescription('');
      setFrequency('daily');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-normal italic">
            Add Subscription
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Source Type Selection */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Source Type
          </label>
          <div className="flex flex-wrap gap-2">
            {sourceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => type.available && setSourceType(type.id)}
                  disabled={!type.available}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                    sourceType === type.id
                      ? 'border-black bg-black text-white'
                      : type.available
                      ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{type.label}</span>
                  {!type.available && (
                    <Badge variant="outline" className="ml-1 text-[10px]">
                      Soon
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* GitHub Repository */}
          {sourceType === 'github' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="owner" className="mb-1 block text-sm font-medium text-gray-700">
                    Owner
                  </label>
                  <input
                    type="text"
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="facebook"
                    required
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label htmlFor="repo" className="mb-1 block text-sm font-medium text-gray-700">
                    Repository
                  </label>
                  <input
                    type="text"
                    id="repo"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="react"
                    required
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My React Subscription"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="frequency" className="mb-1 block text-sm font-medium text-gray-700">
                  Collection Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'hourly' | 'daily' | 'weekly')}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  disabled={isLoading}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </>
          )}

          {/* Other source types placeholder */}
          {sourceType !== 'github' && (
            <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
              {sourceType.charAt(0).toUpperCase() + sourceType.slice(1)} integration coming soon
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black text-white hover:bg-black/90"
              disabled={isLoading || !owner || !repo}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Subscription'
              )}
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <p className="mt-4 text-xs text-gray-500">
          We'll collect releases and issues from this repository.
        </p>
      </div>
    </div>
  );
}
