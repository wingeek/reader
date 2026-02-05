import { useState, useEffect } from 'react';
import { useMutation, useAction, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { X, Github, Loader2, Plus } from 'lucide-react';

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSubscriptionModal({ isOpen, onClose }: AddSubscriptionModalProps) {
  const createSubscription = useMutation(api.subscriptions.mutations.create);
  const collectReleases = useAction(api.collections.github.collectReleases);
  const collectIssues = useAction(api.collections.github.collectIssues);

  const [sourceType, setSourceType] = useState<'github' | 'hackernews' | 'producthunt' | 'wechat'>('github');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'weekly'>('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset error when owner/repo changes
  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [owner, repo, error]);

  // Check for duplicate subscriptions (only when we have valid input)
  // Must come after useState hooks
  const duplicateCheck = useQuery(
    api.subscriptions.queries.checkDuplicate,
    sourceType === 'github' && owner.trim() && repo.trim()
      ? { sourceType: 'github', owner: owner.trim(), repo: repo.trim() }
      : 'skip'
  );

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
      // Check for duplicate subscription
      if (duplicateCheck?.exists) {
        setError(`This repository has already been added as "${duplicateCheck.subscription.name}"`);
        setIsLoading(false);
        return;
      }

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div
        className="w-120 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 pb-5">
          <h2 className="font-playfair text-[24px] font-normal italic text-black">
            Add Subscription
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-transparent text-gray-400 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F0F0F0]" />

        {/* Source Type Selection */}
        <div className="px-6 py-5">
          <label className="mb-3 block text-[13px] font-medium text-black">
            Source Type
          </label>
          <div className="grid grid-cols-4 gap-2">
            {sourceTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => type.available && setSourceType(type.id)}
                  disabled={!type.available}
                  className={`flex h-10 items-center justify-center gap-2 border px-2 text-sm whitespace-nowrap transition-colors ${
                    sourceType === type.id
                      ? 'border-black bg-black text-white'
                      : type.available
                      ? 'border-[#E5E5E5] bg-white text-gray-700 hover:bg-gray-50'
                      : 'border-[#E5E5E5] bg-[#F5F5F5] text-[#AAAAAA] cursor-not-allowed'
                  }`}
                >
                  {Icon && sourceType === type.id && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="text-[13px]">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F0F0F0]" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          {/* GitHub Repository */}
          {sourceType === 'github' && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="owner" className="block text-[13px] font-medium text-black">
                    Owner
                  </label>
                  <input
                    type="text"
                    id="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="facebook"
                    required
                    className="h-11 w-full border border-[#E5E5E5] bg-white px-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="repo" className="block text-[13px] font-medium text-black">
                    Repository
                  </label>
                  <input
                    type="text"
                    id="repo"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    placeholder="react"
                    required
                    className="h-11 w-full border border-[#E5E5E5] bg-white px-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="block text-[13px] font-medium text-black">
                  Name (optional)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My React Subscription"
                  className="h-11 w-full border border-[#E5E5E5] bg-white px-3 text-sm text-black placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="frequency" className="block text-[13px] font-medium text-black">
                  Collection Frequency
                </label>
                <div className="relative">
                  <select
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as 'hourly' | 'daily' | 'weekly')}
                    className="h-11 w-full appearance-none border border-[#E5E5E5] bg-white px-3 pr-10 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    disabled={isLoading}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other source types placeholder */}
          {sourceType !== 'github' && (
            <div className="rounded-md bg-gray-50 p-4 text-center text-sm text-gray-500">
              {sourceType.charAt(0).toUpperCase() + sourceType.slice(1)} integration coming soon
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Duplicate Warning */}
          {duplicateCheck?.exists && !error && (
            <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-700">
              <span className="font-medium">Already added:</span> This repository exists as "{duplicateCheck.subscription.name}"
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 w-30 border-[#E5E5E5] text-black hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 w-45 gap-2 bg-black text-white hover:bg-black/90"
              disabled={isLoading || !owner || !repo || !!duplicateCheck?.exists}
            >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Subscription
              </>
            )}
          </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="h-px bg-[#F0F0F0]" />

        {/* Help Text */}
        <p className="px-6 py-4 pb-6 text-[12px] text-gray-500">
          We'll collect releases and issues from this repository.
        </p>
      </div>
    </div>
  );
}
