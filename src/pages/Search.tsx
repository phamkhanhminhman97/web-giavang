import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate search functionality
    setLoading(true);
    
    // In a real implementation, you would fetch search results from an API
    // For now, we'll just simulate a delay and return empty results
    const timer = setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{`Tìm kiếm: ${searchTerm} | GiaVang247`}</title>
        <meta name="description" content={`Kết quả tìm kiếm cho "${searchTerm}" trên GiaVang247`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm cho: "{searchTerm}"</h1>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-dark"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold text-gold-dark">{result.title}</h2>
              <p className="text-gray-600 mt-2">{result.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Không tìm thấy kết quả nào cho "{searchTerm}"</p>
          <p className="mt-4">Vui lòng thử lại với từ khóa khác hoặc quay lại trang chủ.</p>
        </div>
      )}
    </div>
  );
};

export default Search;
