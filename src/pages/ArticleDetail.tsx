import { useParams, useNavigate } from 'react-router-dom';
import { articles } from '@/data/articles';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <button 
            onClick={() => navigate(-1)}
            className="mb-6 text-gold-dark hover:underline flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" /> Quay lại
          </button>
          
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <p className="text-gold text-sm mb-2">Đăng ngày: {article.date}</p>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 mb-4">
                {article.title}
              </h1>
            </header>
            
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 mb-6">{article.summary}</p>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-6">
                  {article.content.title}
                </h2>
                
                {article.content.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                {article.content.list && (
                  <div className="my-6">
                    {article.content.list.title && (
                      <h3 className="text-lg font-semibold mb-3 text-slate-800">
                        {article.content.list.title}
                      </h3>
                    )}
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      {article.content.list.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {article.content.conclusion && (
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-slate-700 font-medium">{article.content.conclusion}</p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
