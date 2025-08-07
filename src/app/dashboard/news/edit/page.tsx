// app/dashboard/news/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface NewsForm {
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export default function NewsEditPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');            // 编辑模式
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<NewsForm>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    published: true,
  });

  /* ---------- 编辑模式：拉取旧数据 ---------- */
  useEffect(() => {
    if (!id) return;
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm({
          title: data.title || '',
          content: data.content || '',
          date: data.date || new Date().toISOString().split('T')[0],
          published: data.published || false,
        });
      } catch {
        alert(t('fetchError'));
        router.replace('/dashboard/news');
      }
    };
    fetchNews();
  }, [id, router, t]);

  /* ---------- 表单提交 ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = id ? `/api/news/${id}` : '/api/news';
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      router.replace('/dashboard');
    } catch {
      alert(t('saveError'));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- 渲染 ---------- */
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {id ? t('editNews') : t('addNews')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 标题 */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('title')}</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 内容 */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('content')}</label>
          <textarea
            required
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 日期 */}
        <div>
          <label className="block text-sm font-medium mb-1">{t('date')}</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        {/* 是否发布 */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="mr-2"
          />
          <label>{t('published')}</label>
        </div>

        {/* 按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? t('saving') : t('save')}
          </button>
        </div>
      </form>
    </div>
  );
}