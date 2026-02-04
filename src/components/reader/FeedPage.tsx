import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { Clock, MoreVertical, Loader2 } from 'lucide-react';

interface FeedPageProps {
  onViewArticle: () => void;
}

type FilterType = 'all-updates' | 'unread' | 'starred';

export default function FeedPage({ onViewArticle }: FeedPageProps) {
  const articles = useQuery(api.articles.queries.listRecent, { limit: 50 });
  const [activeFilter, setActiveFilter] = useState<FilterType>('all-updates');

  // Group articles by time
  const todayArticles = articles?.filter(article => {
    const articleDate = new Date(article.publishedAt);
    const today = new Date();
    return articleDate.toDateString() === today.toDateString();
  }) || [];

  const yesterdayArticles = articles?.filter(article => {
    const articleDate = new Date(article.publishedAt);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return articleDate.toDateString() === yesterday.toDateString();
  }) || [];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Feed Header */}
      <section className="border-b border-gray-200 px-5 py-6 md:px-14 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Feed</span>
        </div>

        {/* Title and Mark All Button */}
        <div className="mb-4 flex flex-col gap-3 md:mb-0 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-playfair text-5xl font-normal italic leading-tight tracking-tight md:text-[56px]">
              Your Feed
            </h1>
            <p className="text-sm text-gray-500">
              Latest updates from your subscriptions
            </p>
          </div>

          <Button variant="outline" className="rounded-md border-black px-6 py-3 text-sm font-medium text-black hover:bg-gray-50">
            Mark all as read
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-8 flex gap-3">
          {(['all-updates', 'unread', 'starred'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                rounded-md px-4 py-2 text-sm font-medium transition-colors
                ${activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-transparent text-gray-600 hover:text-black'
                }
              `}
            >
              {filter === 'all-updates' && 'All Updates'}
              {filter === 'unread' && `Unread (${todayArticles.length})`}
              {filter === 'starred' && 'Starred'}
            </button>
          ))}
        </div>
      </section>

      {/* Feed Timeline */}
      <section className="px-5 py-4 pb-20 md:px-14 md:py-16">
        {articles && articles.length > 0 ? (
          <div className="flex flex-col gap-8">
            {/* Today Section */}
            {todayArticles.length > 0 && (
              <div className="flex flex-col gap-6">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="h-px w-1 bg-black" />
                  <h2 className="text-sm font-bold uppercase text-black">Today</h2>
                  <div className="h-px flex-1 bg-black" />
                </div>

                {/* Feed Items */}
                {todayArticles.map((article) => (
                  <FeedItem
                    key={article._id}
                    article={article}
                    onClick={onViewArticle}
                  />
                ))}
              </div>
            )}

            {/* Yesterday Section */}
            {yesterdayArticles.length > 0 && (
              <div className="flex flex-col gap-6">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                  <div className="h-px w-1 bg-gray-300" />
                  <h2 className="text-sm font-bold uppercase text-gray-400">Yesterday</h2>
                  <div className="h-px flex-1 bg-gray-300" />
                </div>

                {/* Feed Items */}
                {yesterdayArticles.map((article) => (
                  <FeedItem
                    key={article._id}
                    article={article}
                    onClick={onViewArticle}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            <div className="flex justify-center pt-4">
              <button className="rounded-md border border-black px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-50">
                Load more updates
              </button>
            </div>
          </div>
        ) : articles === undefined ? (
          // Loading state
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Clock className="mb-4 h-16 w-16 text-gray-300" />
            <h2 className="font-playfair text-2xl font-normal italic text-gray-900">
              No articles yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Add subscriptions to start collecting content
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

// Feed Item Component
function FeedItem({ article, onClick }: any) {
  const isUnread = article.unread !== false; // Default to unread if not specified

  return (
    <article className="flex flex-col gap-3">
      {/* Header: Source + Time + Status */}
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {article.sourceType || 'Source'}
        </span>
        <span className="text-xs text-gray-500">
          {formatRelativeTime(new Date(article.publishedAt))}
        </span>
        {isUnread && (
          <div className="h-2 w-2 rounded-full bg-black" />
        )}
        {!isUnread && (
          <span className="text-xs text-gray-400">Read</span>
        )}
      </div>

      {/* Content Card */}
      <button
        onClick={onClick}
        className={`
          rounded-xl p-5 text-left transition-all hover:shadow-md
          ${isUnread
            ? 'bg-[#FAFAFA] hover:bg-[#F5F5F5]'
            : 'bg-white border border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <h3 className={`
          font-playfair text-xl font-normal italic mb-2
          ${isUnread ? 'text-black' : 'text-gray-600'}
        `}>
          {article.title}
        </h3>

        {article.excerpt && (
          <p className={`
            text-sm leading-relaxed mb-3 line-clamp-2
            ${isUnread ? 'text-gray-600' : 'text-gray-400'}
          `}>
            {article.excerpt}
          </p>
        )}

        {/* Meta: Read time + Author */}
        <div className="flex items-center gap-6 text-xs text-gray-500">
          {article.readingTime && (
            <span>{article.readingTime} min read</span>
          )}
          {article.author && (
            <span>By {article.author}</span>
          )}
        </div>
      </button>
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

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
