'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function NewsDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setNews(data);
      } catch {
        alert(t('fetchError'));
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id, t]);

  if (loading) return <div className="p-6">{t('loading')}</div>;

  if (!news) return <div className="p-6">{t('notFound')}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>{new Date(news.date).toLocaleDateString()}</span>
        <div className="flex items-center space-x-1">
          <span>{news.username}</span>
          <img src={news.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br>') }}
      />
    </div>
  );
}