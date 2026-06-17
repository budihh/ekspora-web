import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
};

export default async function NewsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
  
  let newsList: NewsItem[] = [];
  let hasError = false;

  try {
    const res = await fetch(`${API_URL}/news`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch news');
    const data = await res.json();
    newsList = data.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="pt-48 pb-24 min-h-screen text-center">
        <h1 className="text-h2 font-display text-text-primary">Unable to load news</h1>
        <p className="text-text-secondary mt-4">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-display font-display font-bold bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent tracking-tighter mb-4">
          News & Updates
        </h1>
        <p className="text-body text-text-secondary mb-12">
          Latest information and insights from Ekspora.
        </p>

        <div className="flex flex-col border-t border-border-hairline">
          {newsList.length > 0 ? (
            newsList.map((item) => (
              <article key={item.id} className="group flex flex-col sm:flex-row py-8 border-b border-border-hairline hover:bg-surface-2/30 transition-colors">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  {item.imageUrl ? (
                    <div className="w-[120px] h-[80px] relative rounded-md border border-border-hairline overflow-hidden">
                      <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-[120px] h-[80px] bg-surface-2 rounded-md border border-border-hairline flex items-center justify-center text-text-muted">
                      <svg className="w-6 h-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <time className="text-micro text-text-muted font-mono uppercase tracking-wider">{item.date}</time>
                  </div>
                  <h3 className="text-h3 font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-small text-text-secondary line-clamp-2">
                    {item.content}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="py-12 text-center text-text-secondary text-small">
              No news articles found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
