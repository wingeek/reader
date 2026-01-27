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
      <section className="border-b border-gray-200 px-5 py-6 md:px-14 md:py-16 md:pt-12">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-2 text-xs md:mb-6">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Bookmarks</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="font-playfair text-[44px] font-normal italic leading-tight md:text-6xl md:tracking-tighter">
            Your Bookmarks
          </h1>
          <p className="text-sm text-gray-500">5 saved articles</p>
        </div>
      </section>

      {/* Bookmarks List Section */}
      <section className="px-5 py-4 pb-20 md:px-14 md:py-12 md:pb-16">
        {/* Bookmarks List */}
        <div className="flex flex-col gap-4 md:gap-8">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 md:border-b md:rounded-none md:bg-transparent md:px-0 md:py-8"
            >
              <div className="flex flex-col gap-3 md:flex-row md:justify-between">
                <button
                  onClick={onViewArticle}
                  className="flex max-w-full flex-col gap-3 px-0 text-left hover:bg-gray-50 transition-colors md:px-4 md:max-w-2xl -mx-4 md:mx-0"
                >
                  {/* Meta */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <Badge variant="default" className="border-black bg-black text-white">
                      {bookmark.tag}
                    </Badge>
                    <span className="text-xs text-gray-500">{bookmark.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-base font-normal italic md:text-2xl">
                    {bookmark.title}
                  </h3>
                </button>

                <div className="flex items-center justify-between md:flex-col md:items-end md:gap-2 md:pr-4">
                  <div className="text-xs text-gray-500">
                    {bookmark.date}
                  </div>
                  <button className="text-xs font-medium text-red-500 hover:text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer - Desktop only */}
      <footer className="mt-auto hidden items-center justify-between border-t border-black px-14 py-12 md:flex">
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
