import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import AskAI from '../components/AskAI';
import ContentGenerator from '../components/ContentGenerator';
import SEO from '../components/SEO';

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ask');

  return (
    <div className="container mx-auto py-8 px-4">
      <SEO
        pageName="cong-cu-ai"
        additionalKeywords="AI, công cụ AI, phân tích vàng, thị trường vàng, deepseek, trí tuệ nhân tạo, tạo nội dung AI, dự báo giá vàng AI"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Công cụ AI</h1>
        <p className="text-center text-muted-foreground mb-8">
          Sử dụng trí tuệ nhân tạo để phân tích thị trường vàng và hỗ trợ đầu tư
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ask">Hỏi AI</TabsTrigger>
            <TabsTrigger value="generate">Tạo nội dung</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ask" className="mt-6">
            <AskAI />
          </TabsContent>
          
          <TabsContent value="generate" className="mt-6">
            <ContentGenerator />
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Về công nghệ AI của chúng tôi</h2>
          <p className="mb-4">
            Chúng tôi sử dụng công nghệ trí tuệ nhân tạo tiên tiến từ Deepseek để cung cấp các phân tích 
            chuyên sâu và nội dung chất lượng cao về thị trường vàng.
          </p>
          <p className="mb-4">
            Các công cụ AI của chúng tôi có thể:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Trả lời các câu hỏi về thị trường vàng và đầu tư</li>
            <li>Tạo nội dung chuyên sâu về các chủ đề liên quan đến vàng</li>
            <li>Phân tích xu hướng thị trường dựa trên dữ liệu giá vàng</li>
            <li>Đưa ra các dự báo và lời khuyên đầu tư</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Lưu ý: Mặc dù AI của chúng tôi được đào tạo với dữ liệu chuyên sâu về thị trường vàng, 
            các phân tích và dự báo chỉ mang tính tham khảo và không nên được coi là lời khuyên đầu tư chính thức.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITools;
