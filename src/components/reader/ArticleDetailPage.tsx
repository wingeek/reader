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
        className="flex items-center gap-2 border-b border-gray-200 px-14 py-8 text-sm font-medium text-black hover:bg-gray-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </button>

      {/* Article Header Section */}
      <section className="px-14 py-16 pt-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <span className="text-gray-500">Library</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Design</span>
          <span className="text-gray-400">/</span>
          <span className="text-black">Article</span>
        </div>

        {/* Article Meta */}
        <div className="mb-4 flex items-center gap-3">
          <Badge variant="default" className="border-black bg-black text-white">
            Design
          </Badge>
          <span className="text-xs text-gray-500">8 min read</span>
          <span className="text-xs text-gray-500">January 25, 2026</span>
        </div>

        {/* Article Title */}
        <h1 className="font-playfair text-6xl font-normal italic tracking-tighter text-black">
          The Art of Typography
        </h1>

        {/* Author Info */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
            <span className="text-sm font-semibold text-black">SC</span>
          </div>
          <div>
            <div className="text-sm font-medium text-black">Sarah Chen</div>
            <div className="text-xs text-gray-500">Design Writer</div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="px-14">
        <div className="mb-2 flex h-0.5 w-full bg-gray-200">
          <div className="h-full w-[60%] bg-black" />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Reading progress</span>
          <span className="font-medium text-black">60% complete</span>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-14 pb-16">
        {/* Lead Paragraph */}
        <p className="mb-8 text-lg leading-[1.8] text-neutral-900">
          Typography is more than just selecting fonts. It is the art of arranging type
          in a way that makes written language legible, readable, and appealing when
          displayed. The arrangement of type involves selecting typefaces, point sizes,
          line lengths, line-spacing (leading), and letter-spacing (tracking), and
          adjusting the space between pairs of letters (kerning).
        </p>

        {/* Section 1 */}
        <h2 className="font-playfair text-3xl font-normal italic text-black">
          The Fundamentals
        </h2>

        <p className="mb-6 mt-6 leading-[1.8] text-neutral-700">
          The term typography is also applied to the style, arrangement, and appearance
          of the letters, numbers, and symbols created by the process. Type design is
          a closely related craft, sometimes considered part of typography; most
          typographers do not design typefaces, and some type designers do not
          consider themselves typographers.
        </p>

        <p className="mb-8 leading-[1.8] text-neutral-700">
          Typography is the work of typesetters (formerly known as compositors),
          typographers, graphic designers, art directors, manga artists, comic book
          artists, graffiti artists, and, now, anyone who arranges type for a product.
          Until the Digital Age, typography was a specialized occupation. Digitization
          opened up typography to new generations of visual designers and lay users.
        </p>

        {/* Pull Quote */}
        <div className="my-8 border-y border-black py-12 text-center">
          <blockquote className="font-playfair text-3xl font-normal italic text-black">
            "Typography needs to be audible. Typography needs to be felt."
          </blockquote>
          <cite className="mt-4 text-sm text-gray-500">— Helmut Schmid</cite>
        </div>

        {/* Section 2 */}
        <h2 className="font-playfair text-3xl font-normal italic text-black">
          Modern Typography
        </h2>

        <p className="mb-6 mt-6 leading-[1.8] text-neutral-700">
          In contemporary design, typography has evolved from purely functional
          considerations to become a powerful expressive medium. Digital tools have
          expanded the possibilities, allowing designers to experiment with variable
          fonts, responsive typography, and dynamic layouts that adapt to different
          screens and contexts.
        </p>

        <p className="mb-8 leading-[1.8] text-neutral-700">
          The choice of typeface and its arrangement on the page can significantly
          influence how a message is perceived. Bold, sans-serif fonts might convey
          modernity and strength, while elegant serif fonts can suggest tradition and
          sophistication. The weight, size, and spacing of type all contribute to the
          overall visual hierarchy and readability of the content.
        </p>

        {/* Key Points Box */}
        <div className="mb-8 border border-gray-200 bg-neutral-50 p-8">
          <h3 className="font-playfair text-xl font-semibold italic text-black">
            Key Takeaways
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="font-bold text-black">•</span>
              Typography combines art and technique to make written language legible
              and appealing
            </li>
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="font-bold text-black">•</span>
              Digital tools have revolutionized typographic possibilities
            </li>
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="font-bold text-black">•</span>
              Typeface selection and arrangement significantly influence message
              perception
            </li>
          </ul>
        </div>

        {/* Section 3 - Conclusion */}
        <h2 className="font-playfair text-3xl font-normal italic text-black">
          Conclusion
        </h2>

        <p className="mb-8 mt-6 leading-[1.8] text-neutral-700">
          Whether in print or on screen, typography remains a fundamental aspect of
          design that bridges the gap between content and comprehension. As we continue
          to innovate and explore new possibilities, the core principles of
          typography—clarity, hierarchy, and expression—remain as relevant today as
          they have ever been.
        </p>
      </article>

      {/* Article Actions */}
      <section className="flex justify-center border-t border-gray-200 px-14 py-8">
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
