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
}

export default function DashboardHome() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // 确保数据是数组
        const json = await response.json();
        if (!Array.isArray(json.rows)) throw new Error('Invalid data format');
        setNews(json.rows);
        setFetchError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setFetchError(error instanceof Error ? error.message : 'Unknown error occurred');
        setNews([]); // 设置为空数组以显示空状态
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
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* 新闻卡片内容 */}
          </div>
        ))}
      </div>
    </div>
  );
}