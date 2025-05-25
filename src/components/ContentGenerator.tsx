import React, { useState } from 'react';
import { generateContent, GenerateContentRequest } from '../services/deepseek';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Loader2 } from 'lucide-react';

const ContentGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('article');
  const [length, setLength] = useState('medium');
  const [tone, setTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Vui lòng nhập chủ đề');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const request: GenerateContentRequest = {
        topic: topic.trim(),
        contentType,
        length: length as 'short' | 'medium' | 'long',
        tone,
        language: 'vietnamese',
      };
      
      const response = await generateContent(request);
      
      if (response.success && response.data) {
        setGeneratedContent(response.data.content);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tạo nội dung');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi kết nối với máy chủ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tạo nội dung về thị trường vàng</CardTitle>
        <CardDescription>
          Tạo bài viết, phân tích hoặc tin tức về thị trường vàng với AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Chủ đề</Label>
            <Input
              id="topic"
              placeholder="Nhập chủ đề bạn muốn tạo nội dung..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contentType">Loại nội dung</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="contentType">
                  <SelectValue placeholder="Chọn loại nội dung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Bài viết</SelectItem>
                  <SelectItem value="analysis">Phân tích</SelectItem>
                  <SelectItem value="news">Tin tức</SelectItem>
                  <SelectItem value="guide">Hướng dẫn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="length">Độ dài</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger id="length">
                  <SelectValue placeholder="Chọn độ dài" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Ngắn</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="long">Dài</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Giọng điệu</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Chọn giọng điệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Chuyên nghiệp</SelectItem>
                  <SelectItem value="friendly">Thân thiện</SelectItem>
                  <SelectItem value="formal">Trang trọng</SelectItem>
                  <SelectItem value="educational">Giáo dục</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo nội dung...
              </>
            ) : (
              'Tạo nội dung'
            )}
          </Button>
        </form>
        
        {generatedContent && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Nội dung đã tạo:</h3>
            <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
              {generatedContent}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Powered by Deepseek AI</p>
      </CardFooter>
    </Card>
  );
};

export default ContentGenerator;
