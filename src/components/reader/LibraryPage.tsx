import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const articles = [
  {
    id: 1,
    tag: 'Design',
    time: '8 min read',
    title: 'The Art of Typography',
    excerpt: 'Typography is more than just selecting fonts. It is the art of arranging type in a way that makes written language legible, readable, and appealing.',
    author: 'Sarah Chen',
    date: 'Jan 25, 2026',
  },
  {
    id: 2,
    tag: 'Design',
    time: '5 min read',
    title: 'Minimalism in Modern Design',
    excerpt: 'Less is more. Explore how minimalist design principles can create powerful, focused user experiences.',
    author: 'Alex Kim',
    date: 'Jan 24, 2026',
  },
  {
    id: 3,
    tag: 'Technology',
    time: '12 min read',
    title: 'The Future of Reading',
    excerpt: 'How digital transformation is reshaping the way we consume and interact with written content.',
    author: 'Maria Lopez',
    date: 'Jan 23, 2026',
  },
  {
    id: 4,
    tag: 'Business',
    time: '6 min read',
    title: 'Building Digital Products',
    excerpt: 'A strategic approach to product development that balances user needs with business goals.',
    author: 'James Wilson',
    date: 'Jan 22, 2026',
  },
];

interface LibraryPageProps {
  onViewArticle: () => void;
}

export default function LibraryPage({ onViewArticle }: LibraryPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Library Hero Section */}
      <section className="border-b border-gray-200 px-14 py-16 pt-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Library</span>
        </div>

        {/* Title and Actions */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-playfair text-6xl font-normal italic tracking-tighter">
              Your Library
            </h1>
            <p className="text-sm text-gray-500">12 articles · 3 categories</p>
          </div>

          <div className="flex gap-3">
            <Button className="bg-black text-white hover:bg-black/90">
              + Add Article
            </Button>
            <Button variant="outline" className="border-gray-200">
              Filter
            </Button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mt-8 flex gap-3">
          <Badge variant="default" className="border-black bg-black text-white">
            All
          </Badge>
          <Badge variant="outline" className="border-gray-200">
            Design
          </Badge>
          <Badge variant="outline" className="border-gray-200">
            Technology
          </Badge>
          <Badge variant="outline" className="border-gray-200">
            Business
          </Badge>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="px-14 py-12 pb-16">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-normal italic">
            Recent Articles
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">Sort by:</span>
            <span className="font-medium text-black">Recent ▾</span>
          </div>
        </div>

        {/* Articles List */}
        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
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
                      {article.tag}
                    </Badge>
                    <span className="text-xs text-gray-500">{article.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl font-normal italic hover:underline">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-gray-600">
                    {article.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="mt-2 flex gap-6 text-xs text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </button>

                <div className="flex gap-2">
                  <button className="text-xs font-medium text-black">
                    Bookmark
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-6">
          <span className="font-playfair text-base font-semibold italic text-black">
            1
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-500">2</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-500">3</span>
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
