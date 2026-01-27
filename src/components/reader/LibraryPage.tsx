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
      <section className="border-b border-gray-200 px-5 py-6 md:px-14 md:py-16 md:pt-12">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs md:mb-6">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Library</span>
        </div>

        {/* Title and Actions */}
        <div className="mb-4 flex flex-col gap-2 md:mb-0 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="font-playfair text-[44px] font-normal italic leading-tight md:text-6xl md:tracking-tighter">
              Library
            </h1>
            <p className="text-sm text-gray-500">12 articles · 3 categories</p>
          </div>

          <div className="hidden gap-3 md:flex">
            <Button className="bg-black text-white hover:bg-black/90">
              + Add Article
            </Button>
            <Button variant="outline" className="border-gray-200">
              Filter
            </Button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mt-6 flex gap-2 md:mt-8 md:gap-3">
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
      <section className="px-5 py-4 pb-20 md:px-14 md:py-12 md:pb-16">
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <h2 className="font-playfair text-xl font-normal italic md:text-2xl">
            Recent Articles
          </h2>
        </div>

        {/* Articles List */}
        <div className="flex flex-col gap-4 md:gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 md:border-b md:rounded-none md:bg-transparent md:px-0 md:py-8"
            >
              <button
                onClick={onViewArticle}
                className="flex max-w-full flex-col gap-3 px-0 text-left hover:bg-gray-50 transition-colors md:px-4 md:max-w-2xl -mx-4 md:mx-0"
              >
                {/* Meta */}
                <div className="flex items-center gap-2 md:gap-3">
                  <Badge variant="default" className="border-black bg-black text-white">
                    {article.tag}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.time}</span>
                </div>

                {/* Title */}
                <h3 className="font-playfair text-base font-normal italic md:text-2xl">
                  {article.title}
                </h3>
              </button>
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
