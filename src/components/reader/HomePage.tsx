import { Button } from '../ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-14 py-20 pt-16">
        <h1 className="font-playfair text-6xl font-normal italic tracking-tighter">
          Welcome back
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Continue reading where you left off
        </p>
      </section>

      {/* Continue Reading Section */}
      <section className="px-14 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-normal italic">
            Continue Reading
          </h2>
        </div>

        <div className="border border-gray-200 p-8">
          <div className="flex max-w-2xl flex-col gap-3">
            {/* Meta */}
            <div className="flex items-center gap-3">
              <span className="rounded border border-black bg-black px-2 py-1 text-[10px] font-medium text-white">
                Design
              </span>
              <span className="text-xs text-gray-500">8 min read · 60% complete</span>
            </div>

            {/* Title */}
            <h3 className="font-playfair text-2xl font-normal italic">
              The Art of Typography
            </h3>

            {/* Excerpt */}
            <p className="text-sm leading-relaxed text-gray-600">
              Typography is more than just selecting fonts. It is the art of
              arranging type...
            </p>

            {/* Button */}
            <Button
              variant="outline"
              className="mt-4 w-fit border-gray-200"
            >
              Continue Reading →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 flex items-center justify-between border-t border-black px-14 py-12">
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
