import { useState } from 'react';
import { Bookmark, Home, Library, User } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'library' | 'bookmarks';
  onTabChange: (tab: 'home' | 'library' | 'bookmarks') => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'library' as const, label: 'Library', icon: Library },
    { id: 'bookmarks' as const, label: 'Bookmarks', icon: Bookmark },
  ];

  return (
    <header className="flex items-center justify-between border-b border-black px-14 py-6">
      {/* Logo */}
      <div className="font-playfair text-2xl font-bold italic">Reader</div>

      {/* Navigation */}
      <nav className="flex items-center gap-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`font-${
                isActive ? 'playfair' : 'inter'
              } text-${
                isActive
                  ? 'playfair text-base font-semibold italic'
                  : 'inter text-sm font-normal'
              } ${isActive ? 'text-black' : 'text-gray-500'}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-black">Guest Reader</span>
        <span className="text-xs text-gray-500">Free Plan</span>
      </div>
    </header>
  );
}
