import { useState } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white text-sm p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <span>Website này sử dụng cookie để cải thiện trải nghiệm người dùng. Bằng việc tiếp tục sử dụng, bạn đồng ý với <a href="/bao-mat" className="underline text-gold">chính sách bảo mật</a>.</span>
      <button onClick={() => setVisible(false)} className="mt-2 md:mt-0 bg-gold-dark text-white px-4 py-1 rounded hover:bg-gold ml-4">Đồng ý</button>
    </div>
  );
};

export default CookieConsent; 