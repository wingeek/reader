import { useState } from 'react';
import Header from './reader/Header';
import HomePage from './reader/HomePage';
import LibraryPage from './reader/LibraryPage';
import BookmarksPage from './reader/BookmarksPage';
import ArticleDetailPage from './reader/ArticleDetailPage';

type Tab = 'home' | 'library' | 'bookmarks';
type View = Tab | 'article-detail';

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

      {currentView === 'home' && <HomePage />}
      {currentView === 'library' && <LibraryPage onViewArticle={handleViewArticle} />}
      {currentView === 'bookmarks' && <BookmarksPage onViewArticle={handleViewArticle} />}
      {currentView === 'article-detail' && (
        <ArticleDetailPage onBack={handleBackFromArticle} />
      )}
    </div>
  );
}
