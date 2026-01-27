import { Button } from '../ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-5 py-8 md:px-14 md:py-20 md:pt-16">
        <h1 className="font-playfair text-4xl font-normal italic tracking-tight md:text-6xl md:tracking-tighter">
          Welcome back
        </h1>
        <p className="mt-3 text-sm text-gray-500 md:mt-4 md:text-base">
          Continue reading where you left off
        </p>
      </section>

      {/* Continue Reading Section */}
      <section className="px-5 py-0 md:px-14 md:py-12">
        <div className="mb-4 flex items-center justify-between md:mb-6">
          <h2 className="font-playfair text-xl font-normal italic md:text-2xl">
            Continue Reading
          </h2>
        </div>

        <div className="border border-gray-200 bg-gray-50 p-5 md:p-8 md:bg-white">
          <div className="flex max-w-full flex-col gap-3 md:max-w-2xl">
            {/* Title */}
            <h3 className="font-playfair text-lg font-normal italic md:text-2xl">
              The Art of Typography
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 md:text-sm">8 min read · 60% complete</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[60%] bg-black" />
            </div>

            {/* Button */}
            <Button
              variant="outline"
              className="mt-2 w-fit border-gray-200 md:mt-4"
            >
              Continue Reading →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Desktop only */}
      <footer className="mt-8 hidden items-center justify-between border-t border-black px-14 py-12 md:flex">
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
