import { Home, BookOpen, Bookmark, Rss, Radio } from 'lucide-react';

type Tab = 'home' | 'library' | 'subscriptions' | 'feed' | 'bookmarks';

interface MobileBottomNavProps {
  currentView: Tab;
  onViewChange: (view: Tab) => void;
}

export default function MobileBottomNav({ currentView, onViewChange }: MobileBottomNavProps) {
  const navItems = [
    { id: 'home' as Tab, icon: '🏠', label: 'Home', lucideIcon: Home },
    { id: 'library' as Tab, icon: '📚', label: 'Library', lucideIcon: BookOpen },
    { id: 'subscriptions' as Tab, icon: '📡', label: 'Subscriptions', lucideIcon: Rss },
    { id: 'feed' as Tab, icon: '📰', label: 'Feed', lucideIcon: Radio },
    { id: 'bookmarks' as Tab, icon: '🔖', label: 'Bookmarks', lucideIcon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-inset-bottom">
      <div className="flex h-[50px] items-center justify-around px-5">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const IconComponent = item.lucideIcon;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors hover:bg-gray-50 active:bg-gray-100"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`text-xl leading-none transition-colors ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}>
                {item.icon}
              </span>
              <span className={`text-[11px] font-medium leading-none transition-colors ${
                isActive ? 'text-black' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
