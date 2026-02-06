import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft, Send, BookOpen, Lightbulb } from "lucide-react";

interface AITutorScreenProps {
  language: 'sw' | 'en';
  accessToken: string;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AITutorScreen({ language, accessToken, onBack }: AITutorScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = language === 'sw' ? {
    title: 'Mwalimu AI',
    subtitle: 'Uliza maswali kuhusu uwekezaji',
    placeholder: 'Andika swali lako...',
    send: 'Tuma',
    welcome: 'Habari! Mimi ni mwalimu wako wa AI. Niko hapa kukusaidia kujifunza kuhusu uwekezaji. Uliza swali lolote!',
    topics: 'Mada Muhimu:',
    topicsList: [
      { emoji: '📊', text: 'ETF ni nini?' },
      { emoji: '💰', text: 'Eleza kuhusu Bonds' },
      { emoji: '⚠️', text: 'Hatari ya uwekezaji' },
      { emoji: '🏦', text: 'DSE ni nini?' },
      { emoji: '📈', text: 'Portfolio ni nini?' },
      { emoji: '💵', text: 'Dividend ni nini?' }
    ]
  } : {
    title: 'AI Tutor',
    subtitle: 'Ask questions about investing',
    placeholder: 'Type your question...',
    send: 'Send',
    welcome: 'Hello! I\'m your AI investment tutor. I\'m here to help you learn about investing. Ask me anything!',
    topics: 'Key Topics:',
    topicsList: [
      { emoji: '📊', text: 'What is an ETF?' },
      { emoji: '💰', text: 'Explain Bonds' },
      { emoji: '⚠️', text: 'Investment risk' },
      { emoji: '🏦', text: 'What is DSE?' },
      { emoji: '📈', text: 'What is a portfolio?' },
      { emoji: '💵', text: 'What is a dividend?' }
    ]
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      { role: 'assistant', content: t.welcome }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (question?: string) => {
    const messageText = question || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { projectId } = await import('@/utils/supabase/info');
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-f0a5cca3`;

      const response = await fetch(`${apiUrl}/ai-tutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          question: messageText,
          language
        })
      });

      const result = await response.json();

      if (response.ok) {
        const assistantMessage: Message = { role: 'assistant', content: result.response };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = { 
          role: 'assistant', 
          content: language === 'sw' ? 'Samahani, kuna tatizo. Jaribu tena.' : 'Sorry, there was an error. Please try again.' 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error('AI tutor error:', err);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: language === 'sw' ? 'Samahani, kuna tatizo. Jaribu tena.' : 'Sorry, there was an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-sm text-teal-100">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4 mb-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm">AI {t.title}</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topics */}
        {messages.length === 1 && (
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-gray-900">{t.topics}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {t.topicsList.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(topic.text)}
                  className="p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-left"
                >
                  <span className="text-2xl mb-2 block">{topic.emoji}</span>
                  <span className="text-sm font-medium text-gray-900">{topic.text}</span>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}