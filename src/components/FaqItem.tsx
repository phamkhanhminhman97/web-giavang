import { useState, useMemo } from "react";
import { HelpCircle } from "lucide-react";
import { useFormattedDate } from "@/hooks/use-formatted-date";

type FaqItemProps = {
  question: string;
  answer: string;
};

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use our custom hook for formatted date
  const { formattedDate } = useFormattedDate();
  
  // Create a stable ID for accessibility
  const faqId = useMemo(() => 
    `faq-answer-${question.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`,
  [question]);
  
  return (
    <div className="border border-gold-light/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button 
        className="w-full flex items-center justify-between p-5 text-left bg-gold-muted/5 hover:bg-gold-muted/10 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={faqId}
      >
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-gold-dark to-gold p-1.5 rounded-full text-white mr-3 flex-shrink-0">
            <HelpCircle size={16} aria-hidden="true" />
          </div>
          <h3 className="font-medium text-slate-800">{question}</h3>
        </div>
        <div 
          className={`w-6 h-6 flex items-center justify-center rounded-full border border-gold-light/50 text-gold-dark transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gold-light/10' : ''}`}
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </div>
      </button>
      {isOpen && (
        <div 
          className="p-6 bg-white/80 border-t border-gold-light/20"
          id={faqId}
        >
          <p className="text-slate-700 leading-relaxed">{answer}</p>
          <div className="mt-4 pt-3 border-t border-dashed border-gold-light/30 flex justify-end">
            <span className="text-xs text-gold-dark/70 italic">Cập nhật: {formattedDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
