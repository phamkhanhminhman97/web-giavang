import { useParams, useNavigate, Link } from 'react-router-dom';
import { articles } from '@/data/articles';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articles.find(article => article.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
            <button 
              onClick={() => navigate('/phan-tich')}
              className="text-gold-dark hover:underline flex items-center mx-auto"
            >
              <ArrowLeft size={16} className="mr-1" /> Quay lại trang phân tích
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO pageName="article" customData={{ article }} />
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-10">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm text-slate-500 flex items-center gap-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold-dark">Trang chủ</Link>
            <span className="mx-1">/</span>
            <Link to="/phan-tich" className="hover:text-gold-dark">Phân tích</Link>
            <span className="mx-1">/</span>
            <span className="text-gold-dark font-medium truncate max-w-xs" title={article.title}>{article.title}</span>
          </nav>
          <button 
            onClick={() => navigate(-1)}
            className="mb-8 text-gold-dark hover:underline flex items-center text-base"
          >
            <ArrowLeft size={18} className="mr-2" /> Quay lại
          </button>
          <article className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 md:p-10 border border-gray-100">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-2 leading-tight">
                {article.title}
              </h1>
              <p className="text-sm text-gray-400">Đăng ngày: {article.date}</p>
            </header>
            <p className="text-lg text-gray-700 mb-8 font-serif leading-relaxed text-center">{article.summary}</p>
            <div className="w-full h-52 md:h-64 rounded-lg overflow-hidden mb-10 bg-gray-100 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" alt="gold" className="object-cover w-full h-full" />
            </div>
            <div className="prose max-w-none text-gray-800 prose-headings:font-playfair prose-headings:text-gold-dark prose-h2:text-2xl prose-h2:mb-6">
              <h2>{article.content.title}</h2>
              {article.content.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {article.content.list && (
                <div className="my-8 bg-gray-50 rounded-lg p-5 border-l-4 border-gold-light">
                  {article.content.list.title && (
                    <h3 className="text-base font-semibold mb-3 text-gold-dark font-playfair">
                      {article.content.list.title}
                    </h3>
                  )}
                  <ul className="list-disc pl-6 space-y-2 text-base">
                    {article.content.list.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {article.content.conclusion && (
                <blockquote className="mt-10 border-l-4 border-gold-light bg-gray-50 text-lg italic text-gold-dark font-serif rounded p-5">
                  {article.content.conclusion}
                </blockquote>
              )}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
