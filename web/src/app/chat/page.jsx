import React, { useState, useEffect, useRef } from "react";
import useUser from "@/utils/useUser";
import {
  Send,
  Bot,
  User,
  Heart,
  Activity,
  AlertCircle,
  Clock,
  MessageCircle,
  Stethoscope,
  FileText,
  Plus
} from "lucide-react";

export default function ChatPage() {
  const { data: user, loading: userLoading } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && !conversationId) {
      initializeChat();
    }
  }, [user]);

  const initializeChat = async () => {
    try {
      const response = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_type: 'ai_chat'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversationId(data.id);
        
        // Add welcome message
        const welcomeMessage = {
          id: Date.now(),
          sender_type: 'ai',
          message_text: "Hello! I'm your AI health assistant. I can help you with general health questions, symptoms assessment, and connect you with doctors when needed. How can I help you today?",
          created_at: new Date().toISOString(),
          is_ai_generated: true
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !conversationId) return;

    const userMessage = {
      id: Date.now(),
      sender_type: 'user',
      message_text: inputMessage.trim(),
      created_at: new Date().toISOString(),
      is_ai_generated: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation_id: conversationId,
          message_text: userMessage.message_text
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + 1,
          sender_type: 'ai',
          message_text: data.ai_response,
          created_at: new Date().toISOString(),
          is_ai_generated: true,
          ai_confidence: data.confidence
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender_type: 'ai',
        message_text: "I'm sorry, I'm having trouble responding right now. Please try again or contact a doctor directly if this is urgent.",
        created_at: new Date().toISOString(),
        is_ai_generated: true,
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    {
      icon: Heart,
      text: "Symptom Check",
      message: "I'm experiencing some symptoms and would like to discuss them with you."
    },
    {
      icon: Activity,
      text: "Health Tips",
      message: "Can you give me some general health tips for staying healthy?"
    },
    {
      icon: Stethoscope,
      text: "Find Doctor",
      message: "I need to find a doctor. Can you help me with that?"
    },
    {
      icon: FileText,
      text: "Medical Questions",
      message: "I have some general medical questions I'd like to ask."
    }
  ];

  const handleQuickAction = (message) => {
    setInputMessage(message);
    inputRef.current?.focus();
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1A5DFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5C6F92]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FBFF] to-[#E8F3FF] flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-geist font-bold text-2xl text-[#1B2E54] mb-4">
            Sign in to Chat
          </h1>
          <p className="text-[#5C6F92] mb-8">
            Create an account or sign in to start chatting with our AI health assistant and connect with doctors.
          </p>
          <div className="space-y-3">
            <a
              href="/account/signup"
              className="block w-full gradient-bg text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-all"
            >
              Create Account
            </a>
            <a
              href="/account/signin"
              className="block w-full bg-white border-2 border-[#1A5DFF] text-[#1A5DFF] font-medium py-3 px-4 rounded-xl hover:bg-[#F8FBFF] transition-all"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Bricolage+Grotesque:wght@600;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-geist { font-family: 'Geist', sans-serif; }
        .font-bricolage { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
        }
        
        .typing-animation {
          animation: typing 1.4s ease-in-out infinite;
        }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-[#EEF2FA] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <a href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#1B2E54] font-bricolage font-extrabold text-xl">
                  HealthCare+
                </span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[#5C6F92] text-sm">AI Assistant Online</span>
              </div>
              <a
                href="/dashboard"
                className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#F8FBFF] to-[#E8F3FF] p-6 border-b border-[#EEF2FA]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bricolage font-bold text-xl text-[#1B2E54]">
                AI Health Assistant
              </h1>
              <p className="text-[#5C6F92]">
                Get instant health advice and connect with doctors
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="p-6 border-b border-[#EEF2FA]">
            <h2 className="font-medium text-[#1B2E54] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.message)}
                  className="flex flex-col items-center p-4 bg-[#F8FBFF] rounded-xl hover:bg-[#E8F3FF] hover:scale-105 transition-all group"
                >
                  <action.icon className="w-6 h-6 text-[#1A5DFF] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-[#1B2E54]">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] flex items-start space-x-3 ${
                  message.sender_type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender_type === 'user' 
                      ? 'bg-[#1A5DFF]' 
                      : message.error 
                        ? 'bg-red-500' 
                        : 'gradient-bg'
                  }`}
                >
                  {message.sender_type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : message.error ? (
                    <AlertCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender_type === 'user'
                      ? 'bg-[#1A5DFF] text-white'
                      : message.error
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-[#F8FBFF] text-[#1B2E54] border border-[#EEF2FA]'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.message_text}</p>
                  
                  {message.ai_confidence && (
                    <div className="mt-2 text-xs opacity-70">
                      Confidence: {Math.round(message.ai_confidence * 100)}%
                    </div>
                  )}
                  
                  <div className={`text-xs mt-2 opacity-70`}>
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#F8FBFF] px-4 py-3 rounded-2xl border border-[#EEF2FA]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#1A5DFF] rounded-full typing-animation"></div>
                    <div className="w-2 h-2 bg-[#1A5DFF] rounded-full typing-animation" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#1A5DFF] rounded-full typing-animation" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-6 border-t border-[#EEF2FA] bg-white">
          <form onSubmit={sendMessage} className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                className="w-full px-4 py-3 bg-[#F8FBFF] border border-[#EEF2FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5DFF]/20 focus:border-[#1A5DFF] resize-none transition-all"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="gradient-bg text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-3 text-center">
            <p className="text-xs text-[#5C6F92]">
              This AI assistant provides general health information only. For medical emergencies, call emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}