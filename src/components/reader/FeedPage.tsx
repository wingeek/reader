import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, Calendar, ExternalLink } from 'lucide-react';

interface FeedPageProps {
  onViewArticle: () => void;
}

export default function FeedPage({ onViewArticle }: FeedPageProps) {
  const articles = useQuery(api.articles.queries.listRecent, { limit: 50 });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Feed Header */}
      <section className="border-b border-gray-200 px-5 py-6 md:px-14">
        <div className="mb-4 flex flex-col gap-4 md:mb-0 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-playfair text-[44px] font-normal italic leading-tight md:text-6xl">
              Feed
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {articles?.length || 0} articles from your subscriptions
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="default" className="bg-black text-white">
              <Clock className="mr-2 h-4 w-4" />
              Feed
            </Button>
            <Button variant="outline" disabled>
              <Calendar className="mr-2 h-4 w-4" />
              Daily
            </Button>
            <Button variant="outline" disabled>
              Weekly
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-4 pb-20 md:px-14 md:py-12">
        {articles && articles.length > 0 ? (
          <div className="flex flex-col gap-4 md:gap-6">
            {articles.map((article) => (
              <FeedArticle key={article._id} article={article} onClick={onViewArticle} />
            ))}
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

function FeedArticle({ article, onClick }: any) {
  return (
    <article className="rounded-lg border border-gray-200 bg-gray-50 p-4 cursor-pointer transition-colors hover:bg-gray-100 md:bg-transparent md:px-0 md:py-4">
      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="default" className="border-black bg-black text-white">
            {article.sourceType}
          </Badge>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          {article.score !== undefined && article.score > 0 && (
            <>
              <span>·</span>
              <span className="text-xs text-gray-500">
                {article.score} upvotes
              </span>
            </>
          )}
          {article.commentsCount !== undefined && article.commentsCount > 0 && (
            <>
              <span>·</span>
              <span className="text-xs text-gray-500">
                {article.commentsCount} comments
              </span>
            </>
          )}
        </div>

        <h3 className="font-playfair text-lg font-normal italic mb-2">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
        )}

        {article.author && (
          <div className="mt-2 text-xs text-gray-500">
            by {article.author}
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
          <ExternalLink className="h-3 w-3" />
          <span>View on {article.sourceType}</span>
        </div>
      </button>
    </article>
  );
}
