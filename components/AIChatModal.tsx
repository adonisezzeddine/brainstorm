import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2, Sparkles, GripVertical } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  sectionContent: string;
}

export default function AIChatModal({ isOpen, onClose, sectionId, sectionContent }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.drag-handle')) {
      setIsDragging(true);
      const rect = modalRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && modalRef.current) {
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        setPosition({ x, y });
        modalRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          sectionId,
          sectionContent,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="flex flex-col h-full"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {/* Header */}
      <div className="drag-handle flex items-center justify-between p-2 border-b border-border/50 cursor-move">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
            <Bot className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-foreground">AI Assistant</h3>
            <p className="text-[10px] text-muted-foreground">Ask me anything</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent/50 rounded-lg text-muted-foreground transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-2">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary/50" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium">How can I help you?</p>
                  <p className="text-[10px]">I can assist with research and writing</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-1.5 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="p-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-lg p-2 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-white'
                        : 'bg-accent/50 text-foreground'
                    }`}
                  >
                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="p-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-1.5">
                <div className="p-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-accent/50 rounded-lg p-2">
                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-border/50 bg-background/50">
            <div className="flex gap-1.5">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 min-h-[32px] max-h-20 px-2 py-1.5 rounded-lg bg-background/40 border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-1.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg hover:from-primary/90 hover:to-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
} 