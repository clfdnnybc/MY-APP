'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  published: boolean;
  username: string;
  avatar: string;
}

export default function DashboardHome() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const json = await response.json();
        if (!Array.isArray(json.rows)) throw new Error('Invalid data format');
        setNews(json.rows);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        {/* 加载状态占位符 */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (fetchError) {
    return (
      <div className="p-6">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-6">
          {t('fetchError')}: {fetchError}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  // 空状态
  if (news.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">📰</div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            {t('noNewsTitle')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('noNewsDescription')}
          </p>
          <Link href="/dashboard/news/edit">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {t('createFirstNews')}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // 正常状态
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {t('latestNews')}
        </h1>
        <Link href="/dashboard/news/edit">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <span className="icon-[mynaui--plus] mr-2 w-5 h-5"></span>
            {t('addNews')}
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(item => (
          <Link href={`dashboard/news/${item.id}`} key={item.id}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow relative">
              <h2 className="text-lg font-semibold mb-2 truncate">{item.title}</h2>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <span>{item.username}</span>
                  <img src={item.avatar} alt="avatar" className="w-5 h-5 rounded-full" />
                </div>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                {item.content}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}