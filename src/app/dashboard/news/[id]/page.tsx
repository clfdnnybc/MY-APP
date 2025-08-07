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
}

export default function NewsDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(news.date).toLocaleDateString()}
      </p>
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br>') }}
      />
    </div>
  );
}