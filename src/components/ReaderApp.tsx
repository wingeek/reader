import { useState } from 'react';
import Header from './reader/Header';
import HomePage from './reader/HomePage';
import LibraryPage from './reader/LibraryPage';
import BookmarksPage from './reader/BookmarksPage';
import ArticleDetailPage from './reader/ArticleDetailPage';
import MobileBottomNav from './reader/MobileBottomNav';

export type Tab = 'home' | 'library' | 'bookmarks';
export type View = Tab | 'article-detail';
export type ViewType = View;

export default function ReaderApp() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [previousTab, setPreviousTab] = useState<Tab>('home');

  const handleTabChange = (tab: Tab) => {
    setCurrentView(tab);
    setPreviousTab(tab);
  };

  const handleViewArticle = () => {
    setPreviousTab(currentView as Tab);
    setCurrentView('article-detail');
  };

  const handleBackFromArticle = () => {
    setCurrentView(previousTab);
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView !== 'article-detail' && (
        <Header activeTab={currentView as Tab} onTabChange={handleTabChange} />
      )}

      <main>
        {currentView === 'home' && <HomePage />}
        {currentView === 'library' && <LibraryPage onViewArticle={handleViewArticle} />}
        {currentView === 'bookmarks' && <BookmarksPage onViewArticle={handleViewArticle} />}
        {currentView === 'article-detail' && (
          <ArticleDetailPage onBack={handleBackFromArticle} />
        )}
      </main>

      {/* Mobile Bottom Navigation - only show on tab views */}
      {currentView !== 'article-detail' && (
        <MobileBottomNav currentView={currentView as Tab} onViewChange={handleTabChange} />
      )}
    </div>
  );
}
