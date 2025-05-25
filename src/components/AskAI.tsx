import React, { useState } from 'react';
import { answerQuestion, AnswerQuestionRequest } from '../services/deepseek';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';

const AskAI: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Vui lòng nhập câu hỏi');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const request: AnswerQuestionRequest = {
        question: question.trim(),
      };
      
      const response = await answerQuestion(request);
      
      if (response.success && response.data) {
        setAnswer(response.data.answer);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi xử lý câu hỏi');
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
        <CardTitle>Hỏi AI về thị trường vàng</CardTitle>
        <CardDescription>
          Đặt câu hỏi về thị trường vàng và nhận câu trả lời từ AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Nhập câu hỏi của bạn về thị trường vàng..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[100px]"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Gửi câu hỏi'
              )}
            </Button>
          </div>
        </form>
        
        {answer && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Câu trả lời:</h3>
            <div className="mt-2 p-4 bg-muted rounded-md whitespace-pre-wrap">
              {answer}
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

export default AskAI;
