import { Badge } from '../ui/badge';

const bookmarks = [
  {
    id: 1,
    tag: 'Design',
    time: '8 min read',
    title: 'The Art of Typography',
    excerpt: 'Typography is more than just selecting fonts. It is the art of arranging type in a way that makes written language legible, readable, and appealing.',
    date: 'Saved on Jan 25, 2026',
  },
  {
    id: 2,
    tag: 'Technology',
    time: '12 min read',
    title: 'The Future of Reading',
    excerpt: 'How digital transformation is reshaping the way we consume and interact with written content.',
    date: 'Saved on Jan 24, 2026',
  },
  {
    id: 3,
    tag: 'Business',
    time: '6 min read',
    title: 'Building Digital Products',
    excerpt: 'A strategic approach to product development that balances user needs with business goals.',
    date: 'Saved on Jan 23, 2026',
  },
];

interface BookmarksPageProps {
  onViewArticle: () => void;
}

export default function BookmarksPage({ onViewArticle }: BookmarksPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Bookmarks Hero Section */}
      <section className="border-b border-gray-200 px-14 py-16 pt-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Bookmarks</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-3">
          <h1 className="font-playfair text-6xl font-normal italic tracking-tighter">
            Your Bookmarks
          </h1>
          <p className="text-sm text-gray-500">5 saved articles</p>
        </div>
      </section>

      {/* Bookmarks List Section */}
      <section className="px-14 py-12 pb-16">
        {/* Bookmarks List */}
        <div className="flex flex-col gap-8">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="border-b border-gray-200 py-8 first:pt-0 last:border-b-0"
            >
              <div className="flex justify-between">
                <button
                  onClick={onViewArticle}
                  className="flex max-w-2xl flex-col gap-3 text-left"
                >
                  {/* Meta */}
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="border-black bg-black text-white">
                      {bookmark.tag}
                    </Badge>
                    <span className="text-xs text-gray-500">{bookmark.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl font-normal italic hover:underline">
                    {bookmark.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-gray-600">
                    {bookmark.excerpt}
                  </p>

                  {/* Date */}
                  <div className="mt-2 text-xs text-gray-500">{bookmark.date}</div>
                </button>

                <div className="flex gap-2">
                  <button className="text-xs font-medium text-black">
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-between border-t border-black px-14 py-12">
        <div className="flex flex-col gap-2">
          <div className="font-playfair text-lg font-bold italic">Reader</div>
          <div className="text-xs text-gray-500">Elegant reading experience</div>
        </div>
        <div className="flex gap-10">
          <a href="#" className="text-sm text-gray-500">
            About
          </a>
          <a href="#" className="text-sm text-gray-500">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-500">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
