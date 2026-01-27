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
    <header className="flex items-center justify-between border-b border-black px-5 py-4 md:px-14 md:py-6">
      {/* Logo */}
      <div className="font-playfair text-xl font-bold italic md:text-2xl">Reader</div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:items-center md:gap-10 cursor-pointer">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`cursor-pointer font-${
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
        <span className="hidden text-sm font-medium text-black md:inline">
          Guest Reader
        </span>
        <span className="hidden text-xs text-gray-500 md:inline">Free Plan</span>
        {/* Mobile avatar placeholder */}
        <div className="h-8 w-8 rounded-full bg-gray-100 md:hidden" />
      </div>
    </header>
  );
}
