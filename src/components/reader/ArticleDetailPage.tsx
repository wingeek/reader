import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Bookmark, Share, Printer } from 'lucide-react';

interface ArticleDetailPageProps {
  onBack: () => void;
}

export default function ArticleDetailPage({ onBack }: ArticleDetailPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Back Navigation */}
      <button
        onClick={onBack}
        className="cursor-pointer flex items-center gap-2 border-b border-gray-200 px-5 py-4 text-sm font-medium text-black hover:bg-gray-50 md:px-14 md:py-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden md:inline">Back to Library</span>
        <span className="md:hidden">Back</span>
      </button>

      {/* Article Header Section */}
      <section className="px-5 py-5 pt-5 md:px-14 md:py-16 md:pt-12">
        {/* Breadcrumb - Mobile only */}
        <div className="mb-3 flex items-center gap-2 text-xs md:hidden">
          <span className="text-gray-500">Library</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Design</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Article</span>
        </div>

        {/* Article Meta */}
        <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
          <Badge variant="default" className="border-black bg-black text-white text-xs">
            Design
          </Badge>
          <span className="text-xs text-gray-500">8 min read</span>
          <span className="text-xs text-gray-500">January 25, 2026</span>
        </div>

        {/* Article Title */}
        <h1 className="font-playfair text-[36px] font-normal italic leading-tight tracking-tight text-black md:text-6xl md:tracking-tighter">
          The Art of Typography
        </h1>

        {/* Author Info */}
        <div className="mt-4 flex items-center gap-3 md:mt-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 md:h-10 md:w-10">
            <span className="text-sm font-semibold text-black">SC</span>
          </div>
          <div>
            <div className="text-sm font-medium text-black">Sarah Chen</div>
            <div className="text-xs text-gray-500">Design Writer</div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="px-5 pb-6 md:px-14 md:pb-8">
        <div className="mb-2 flex h-0.5 w-full bg-gray-200">
          <div className="h-full w-[60%] bg-black" />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Reading progress</span>
          <span className="font-medium text-black">60% complete</span>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-5 pb-20 md:px-14 md:pb-16">
        {/* Lead Paragraph */}
        <p className="mb-6 max-w-[335px] text-base leading-[1.8] text-neutral-900 md:mb-8 md:max-w-none md:text-lg">
          Typography is more than just selecting fonts. It is the art of arranging type
          in a way that makes written language legible, readable, and appealing when
          displayed. The arrangement of type involves selecting typefaces, point sizes,
          line lengths, line-spacing (leading), and letter-spacing (tracking), and
          adjusting the space between pairs of letters (kerning).
        </p>

        {/* Section 1 */}
        <h2 className="font-playfair text-[28px] font-normal italic text-black md:text-3xl">
          The Fundamentals
        </h2>

        <p className="mb-4 mt-4 max-w-[335px] leading-[1.8] text-neutral-700 md:mb-6 md:mt-6 md:max-w-none md:text-sm">
          The term typography is also applied to the style, arrangement, and appearance
          of the letters, numbers, and symbols created by the process. Type design is
          a closely related craft, sometimes considered part of typography; most
          typographers do not design typefaces, and some type designers do not
          consider themselves typographers.
        </p>

        <p className="mb-6 max-w-[335px] leading-[1.8] text-neutral-700 md:mb-8 md:max-w-none md:text-sm">
          Typography is the work of typesetters (formerly known as compositors),
          typographers, graphic designers, art directors, manga artists, comic book
          artists, graffiti artists, and, now, anyone who arranges type for a product.
          Until the Digital Age, typography was a specialized occupation. Digitization
          opened up typography to new generations of visual designers and lay users.
        </p>

        {/* Pull Quote */}
        <div className="my-6 rounded-lg border-0 bg-gray-50 p-6 md:my-8 md:border-y md:border-black md:bg-transparent md:py-12 md:text-center">
          <blockquote className="font-playfair text-2xl font-normal italic text-black md:text-3xl">
            Typography needs to be audible. Typography needs to be felt.
          </blockquote>
          <cite className="mt-2 text-xs text-gray-500 md:mt-4 md:text-sm">— Helmut Schmid</cite>
        </div>

        {/* Section 2 */}
        <h2 className="font-playfair text-[28px] font-normal italic text-black md:text-3xl">
          Modern Typography
        </h2>

        <p className="mb-4 mt-4 max-w-[335px] leading-[1.8] text-neutral-700 md:mb-6 md:mt-6 md:max-w-none md:text-sm">
          In contemporary design, typography has evolved from purely functional
          considerations to become a powerful expressive medium. Digital tools have
          expanded the possibilities, allowing designers to experiment with variable
          fonts, responsive typography, and dynamic layouts that adapt to different
          screens and contexts.
        </p>

        <p className="mb-6 max-w-[335px] leading-[1.8] text-neutral-700 md:mb-8 md:max-w-none md:text-sm">
          The choice of typeface and its arrangement on the page can significantly
          influence how a message is perceived. Bold, sans-serif fonts might convey
          modernity and strength, while elegant serif fonts can suggest tradition and
          sophistication. The weight, size, and spacing of type all contribute to the
          overall visual hierarchy and readability of the content.
        </p>
      </article>

      {/* Article Actions - Desktop only */}
      <section className="hidden justify-center border-t border-gray-200 px-14 py-8 md:flex">
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2 border-gray-200">
            <Bookmark className="h-4 w-4" />
            Bookmark
          </Button>
          <Button variant="outline" className="gap-2 border-gray-200">
            <Share className="h-4 w-4" />
            Share Article
          </Button>
          <Button variant="outline" className="gap-2 border-gray-200">
            <Printer className="h-4 w-4" />
            Print
          </Button>
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
